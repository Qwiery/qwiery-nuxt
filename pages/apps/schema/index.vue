<template>
  <h1>Graph Schema</h1>
  <cyto-viewer ref="viewerControl"></cyto-viewer>
</template>
<script setup lang="ts">
import "splitpanes/dist/splitpanes.css";
import CytoViewer from "~/pages/components/graphviz/cytoscape/cytoViewer.vue";
import GraphAPI from "~/utils/GraphAPI";
import { GraphStyle } from "~/utils/enums";
import { Toasts } from "~/composables/notifications";
let viewer: IGraphViewer;

let viewerControl = ref(null);
definePageMeta({
  layout: "default",
});
useHead({
  title: "Graph Explorer",
});
onMounted(async () => {
  viewer = <IGraphViewer>(<unknown>viewerControl.value);
  if (viewer) {
    // when this is the first page request the Sequelizer setup might not be ready yet
    setTimeout(() => {
      loadSchema();
    }, 400);
  }
});
async function loadSchema() {
  const schema = await GraphAPI.getSchema();
  if (schema) {
    viewer.loadGraph(schema);
    viewer.setStyle(GraphStyle.Schema);
  } else {
    Toasts.error("The schema could not be loaded.");
  }
}
</script>
<style scoped></style>
