import CypherAdapter from "./cypherAdapter.js";

export default (Q) => {
	Q.adapter("cypher", CypherAdapter);
};
