import Cyto from "@orbifold/vue-cytoscape";
import { CytoUtils } from "@orbifold/vue-cytoscape";
export default defineNuxtPlugin((nuxtApp) => {
	/*
	 * This is where you can change the graph visualization library used across the app.
	 * Simple change the imported component and keep the name 'GraphvizViewer'.
	 * The three supported libraries are:
	 * - Cytoscape: https://js.cytoscape.org
	 * - Ogma: https://linkurious.com/ogma
	 * - yFiles: https://yworks.com/yfiles
	 *
	 * Each has been wrapped and the uniform interface allows you to switch between them.
	 * Notes:
	 * - only the Cytoscape package is open source, while Ogma and yFiles are commercial
	 * - Ogma and yFiles need to be installed in the package.json dependencies; change the location of the tgz file to reflect your local setup
	 * */
	// nuxtApp.vueApp.component("GraphvizViewer", CytoscapeViewer);
	nuxtApp.vueApp.use(Cyto);
	return {
		provide: {
			cyto: CytoUtils,
		},
	};
});

// import GraphViewer from "@orbifold/vue-yfiles";
// import { yFilesUtils } from "@orbifold/vue-yfiles";
//
// export default defineNuxtPlugin((nuxtApp) => {
// 	nuxtApp.vueApp.use(GraphViewer);
// 	return {
// 		provide: {
// 			yfiles: yFilesUtils,
// 		},
// 	};
// });
