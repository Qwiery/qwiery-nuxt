import fs from "fs";
import _ from "lodash";
import path from "path";
// const __dirname = path.resolve();

export const Datasets = {
	get datasetsPath() {
		// things like path.join(__dirname, "../../../datasets") doesnt work because __dirname is not recognized
		return "public/datasets";
	},
	/**
	 * This returns the BBC Food graph suitable for the JsonGraphStore.
	 * @returns {Promise<*>}
	 */
	async foodGraph() {
		let found = Datasets.getDataset("food.json");
		if (found) {
			return found;
		} else {
			const url = new URL("https://drive.google.com/uc?export=view&id=12DyKXT3LWMven_vUBNtwoZOARTRPolXc");
			found = await Datasets.fetchFromGoogleDrive(url);
			Datasets.saveDataset("food.json", found);
			return found;
		}
	},
	async fetchFromGoogleDrive(url) {
		try {
			const res = await fetch(url);
			if (res.ok) {
				const json = await res.json();
				return json;
			} else {
				throw JSON.parse(await res.text());
			}
		} catch (e) {
			throw e.message;
		}
	},
	ensureDatasetsDirectory() {
		if (!fs.existsSync(Datasets.datasetsPath)) {
			fs.mkdirSync(Datasets.datasetsPath);
		}
	},
	datasetExists(datasetName) {
		const p = path.join(Datasets.datasetsPath, datasetName);
		return fs.existsSync(p);
	},
	getDataset(datasetName) {
		Datasets.ensureDatasetsDirectory();
		if (!Datasets.datasetExists(datasetName)) {
			return null;
		} else {
			const p = path.join(Datasets.datasetsPath, datasetName);
			return JSON.parse(fs.readFileSync(p, "utf8"));
		}
	},
	saveDataset(datasetName, dataset) {
		const p = path.join(Datasets.datasetsPath, datasetName);
		if (_.isString(dataset)) {
			fs.writeFileSync(p, dataset);
		} else {
			fs.writeFileSync(p, JSON.stringify(dataset));
		}
	},
};
