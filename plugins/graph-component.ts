// import CytoscapeViewer from "~/components/graphviz/cytoscape/CytoscapeViewer.vue";
import yFilesViewer from "~/components/graphviz/yfiles/yFilesViewer.vue";
// import OgmaViewer from "~/components/graphviz/ogma/OgmaViewer.vue";

export default defineNuxtPlugin((nuxtApp) => {
	/*
	 * This is where you can change the graph visualization library used across the app.
	 * Simple change the imported component and keep the name 'GraphvizViewer'.
	 * The three supported libraries are:
	 * - Cytoscape: https://js.cytoscape.org/
	 * - Ogma: https://doc.ogma-graphs.com/
	 * - yFiles: https://yworks.com/yfiles
	 *
	 * Each has been wrapped and the uniform interface allows you to switch between them.
	 * Notes:
	 * - only the Cytoscape package is open source, while Ogma and yFiles are commercial
	 * - Ogma and yFiles need to be installed in the package.json dependencies; change the location of the tgz file to reflect your local setup
	 * */
	nuxtApp.vueApp.component("GraphvizViewer", yFilesViewer);
});
