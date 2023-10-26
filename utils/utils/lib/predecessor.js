import { Utils } from "./utils.js";
import Durations from "./durations.js";

/**
 * A simple structure holding predecessor information.
 */
class Predecessor {
	get delayDays() {
		if (Utils.isEmpty(this.delay)) {
			return 0;
		}
		return Durations.durationToDays(this.delay);
	}

	constructor(id, typeName, delay) {
		this.id = id;
		this.typeName = typeName;
		this.delay = delay;
	}
}

module.exports = Predecessor;
