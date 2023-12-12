import SqlAdapter from "./sqlAdapter.js";

export default (Q) => {
	Q.adapter("sql", SqlAdapter);
};
