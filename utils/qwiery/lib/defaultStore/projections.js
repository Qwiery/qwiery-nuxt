import _ from 'lodash';
import { Utils } from '../../../utils/lib/utils.js';
import parseProjection from '../../../utils/lib/mongo/mongoParse.js';

function getOperator(o) {
    switch (o) {
        case '$eq':
            return '===';
        case '$lt':
            return '<';
        case '$lte':
            return '<=';
        case '$ne':
            return '!==';
        case '$gt':
            return '>';
        case '$gte':
            return '>=';
        case '$and':
            return '&&';
        case '$or':
            return '||';
        default:
            throw new Error(`Unrecognized operator '${o}'.`);
    }
}

function getOperand(o) {
    if (_.isString(o)) {
        return `'${o}'`;
    } else if (_.isNumber(o) || _.isBoolean(o)) {
        return `${o}`;
    } else if (_.isArray(o)) {
        if (o.length === 0) {
            return '[]';
        } else {
            return o.map((u) => getOperand(u)).join(', ');
        }
    } else {
        return o.toString();
    }
}

/**
 * Converts the parsed Mongo-like projection to a predicate (constraint function).
 * @param q {*} The result of a parse operation.
 * @param level? {number} The iteration level.
 * @returns {string|null} A Cypher constraint (i.e. the Where part).
 */
export function traverseAst(q, level = 0) {
    let s = '';
    let variable = 'x';
    if (q.operator) {
        if (q.field) {
            if (_.isArray(q.operand)) {
                // https://www.mongodb.com/docs/manual/reference/operator/query/all/
                if (q.operator === '$all') {
                    s += `(Array(${getOperand(q.operand)}).every(u => ${variable}.${q.field || ''}?.includes(u)))`;
                } else if (q.operator === '$in') {
                    s += `([${getOperand(q.operand)}].includes(${variable}.${q.field || ''}))`;
                } else {
                    s += `(${variable}.${q.field || ''} ${getOperator(q.operator)} [${getOperand(q.operand)}])`;
                }
            } else {
                // https://www.mongodb.com/docs/manual/reference/operator/query/size/
                if (q.operator === '$size') {
                    s += `(${variable}.${q.field}.length === ${getOperand(q.operand)})`;
                }
                // note: this deviates from the Mongo book and is an addition to the syntax
                else if (q.operator === '$startsWith') {
                    s += `(${variable}.${q.field}.toString().startsWith(${getOperand(q.operand)}))`;
                }
                // note: this deviates from the Mongo book and is an addition to the syntax
                else if (q.operator === '$contains') {
                    s += `(Array.isArray(${variable}.${q.field})?${variable}.${q.field}.includes(${getOperand(q.operand)}):${variable}.${
                        q.field
                    }.toString().indexOf(${getOperand(q.operand)})>-1)`;
                } else if (q.operator === '$regex') {
                    s += `(new RegExp('${q.operand}').test(${variable}.${q.field}))`;
                } else if (q.operator === '$not') {
                    const q2 = q.parts[0];
                    const s2 = traverseAst(q2, level + 1);
                    s += `(!${s2})`;
                    q.parts.splice(0, 1);
                } else {
                    s += `(${variable}.${q.field || ''} ${getOperator(q.operator)} ${getOperand(q.operand)})`;
                }
            }
        } else {
            const conjunctor = getOperator(q.operator);
            const coll = [];
            for (const part of q.parts) {
                coll.push(traverseAst(part, variable));
            }
            s += coll.join(` ${conjunctor} `);
            return s;
        }
    }
    if (q.parts.length > 0) {
        for (const u of q.parts) {
            s += traverseAst(u, variable, level + 1);
        }
    }
    return s;
}

export function toConstraint(q) {
    const tree = parseProjection(q);
    if (_.isNil(tree)) {
        return null;
    }
    return traverseAst(tree);
}

/**
 * Turns a Mongo-like projection to a lambda function.
 *
 * @param q {*|Function} A function or plain object.
 * @returns {Function}
 */
export function toPredicate(q) {
    if (_.isNil(q)) {
        return null;
    }
    if (Utils.isEmpty(q)) {
        return null;
    }
    if (_.isFunction(q)) {
        return q;
    }
    if (_.isPlainObject(q)) {
        const c = toConstraint(q);
        if (c) {
            return new Function('x', 'return ' + c);
        }
    }
    return null;
}
