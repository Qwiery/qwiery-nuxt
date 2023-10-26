import {describe, test, it, expect} from 'vitest'

import _ from "lodash";

import moment from "moment";

import {Utils} from "../lib/utils";

describe("Diverse", function () {
	it("should generate a uuid", function () {
		expect(Utils.id().length).toEqual(36);
	});
});
