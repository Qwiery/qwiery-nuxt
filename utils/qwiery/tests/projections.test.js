import { describe, test, it, expect } from 'vitest';
import { toConstraint, toPredicate } from '../lib/defaultStore/projections';

describe('Projections', function () {
    it('should create lambdas for basic cases', function () {
        expect(toPredicate(null)).toBeNull();
        expect(toPredicate({})).toBeNull();
        expect(toPredicate(444)).toBeNull();
        const l = (a) => a;
        expect(toPredicate(l)).toEqual(l);
        expect(toConstraint({})).toEqual('');
        expect(toConstraint({ w: -4 })).toEqual('(x.w === -4)');
        expect(toConstraint({ w: true })).toEqual('(x.w === true)');
        expect(toConstraint({ w: true })).toEqual('(x.w === true)');
        expect(toConstraint({ w: { $lt: 2 } })).toEqual('(x.w < 2)');
        expect(toConstraint({ w: { $regex: 'abc' } })).toEqual("(new RegExp('abc').test(x.w))");
        expect(toConstraint({ w: { $lte: 2 } })).toEqual('(x.w <= 2)');
        expect(toConstraint({ w: { $gt: 2 } })).toEqual('(x.w > 2)');
        expect(toConstraint({ $and: [{ w: true }] })).toEqual('(x.w === true)');
        expect(toConstraint({ $or: [{ w: true }] })).toEqual('(x.w === true)');
        expect(toConstraint({ w: { $gte: 2 } })).toEqual('(x.w >= 2)');
        expect(toConstraint({ w: { $startsWith: 'v' } })).toEqual("(x.w.toString().startsWith('v'))");
        expect(toConstraint({ w: { $in: [3, 4] } })).toEqual('([3, 4].includes(x.w))');
        expect(toConstraint({ w: { $size: 12 } })).toEqual('(x.w.length === 12)');
        expect(toConstraint({ w: { $all: [4, 5] } })).toEqual('(Array(4, 5).every(u => x.w?.includes(u)))');
    });

    it('should work for negations', function () {
        expect(toConstraint({ w: { $not: { $contains: 'a' } } })).toEqual("(!(Array.isArray(x.w)?x.w.includes('a'):x.w.toString().indexOf('a')>-1))");
        expect(toConstraint({ u: { $not: { $eq: 3 } } })).toEqual('(!(x.u === 3))');
    });
});
