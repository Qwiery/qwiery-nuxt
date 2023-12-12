import SqliteAdapter from "./sqliteAdapter.js";

export default (Q) => {
	Q.adapter("sql", SqliteAdapter);
};
