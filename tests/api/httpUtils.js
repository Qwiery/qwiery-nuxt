/*
 * Importing the Nuxt utils does not work with IntelliJ Http Client right now.
 * This set of utils, hence, duplicates the functionality but necessary for the
 * testing of the REST API.
 * */
export default {
	rnd() {
		return Math.floor(Math.random() * 1000).toString();
	},
};
