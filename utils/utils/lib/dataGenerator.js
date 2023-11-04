import _ from "lodash";
import { faker } from "@faker-js/faker";
export default class DataGenerator {
	static firstName(gender = null) {
		return faker.person.firstName(gender);
	}
	static fullName(gender = null) {
		return gender ? faker.person.fullName({ sex: gender }) : faker.person.fullName();
	}
}
