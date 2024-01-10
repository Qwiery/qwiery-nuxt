import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
let route: any = null;
let target = "_blank";

export function navigate(destination) {
	if (Utils.isEmpty(destination)) {
		return;
	}
	if (_.isString(destination)) {
		destination = destination.toString().trim().toLowerCase();
		// route = router.resolve({ name: "/link/to/page", query: { param: "param1" } });
		switch (destination) {
			case "cytoscape":
				route = { fullPath: "https://qwiery.com/graphviz/cytoscape" };
				break;
			case "qwiery":
				route = { fullPath: "https://qwiery.com" };
				break;
			case "twitter":
				route = { fullPath: "https://twitter.com/theorbifold" };
				break;
			case "github":
				route = { fullPath: "https://github.com/Qwiery" };
				break;
			case "orbifold":
				route = { fullPath: "https://orbifold.net" };
				break;
			case "dal":
				route = { fullPath: "https://qwiery.com/dal/" };
				break;
			case "graphviz":
				route = { fullPath: "https://qwiery.com/graphviz/" };
				break;
			case "ogma":
				route = { fullPath: "https://qwiery.com/graphviz/ogma/" };
				break;
			case "yfiles":
				route = { fullPath: "https://qwiery.com/graphviz/yfiles/" };
				break;

			case "gojs":
				route = { fullPath: "https://qwiery.com/graphviz/gojs/" };
				break;
			case "license":
				route = { fullPath: "https://qwiery.com/license" };
				break;
			case "faq":
				route = { fullPath: "https://qwiery.com/faq" };
				break;
			case "plugins":
				route = { fullPath: "https://qwiery.com/dal/plugins" };
				break;
			case "adapters":
				route = { fullPath: "https://qwiery.com/dal/adapters" };
				break;
			case "project1":
				route = { fullPath: "/apps/generic/editor" };
				target = "_self";
				break;
		}
	}
	if (route) {
		window.open(route.fullPath, target);
	}
}
