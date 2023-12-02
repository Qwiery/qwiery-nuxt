import CypherAdapter from "./cypherAdapter";

module.exports = (Q) => {
	Q.adapter("cypher", CypherAdapter);
};
