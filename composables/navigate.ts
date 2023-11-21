import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
let route = null;
let target = "_blank";
export function navigate(destination) {
	if (Utils.isEmpty(destination)) {
		return;
	}
	if (_.isString(destination)) {
		destination = destination.toString().trim().toLowerCase();
		switch (destination) {
			case "cytoscape":
				route = { fullPath: "https://qwiery.com/graphviz/cytoscape" };
			// route = router.resolve({ name: "/link/to/page", query: { param: "param1" } });
		}
	}
	if (route) {
		window.open(route.fullPath, target);
	}
}
