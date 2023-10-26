#!/usr/bin/env tsx
// TODO: finish the release script
import fs from "fs";
import path from "path";
import { Command } from "commander";

import Listr from "listr";
import { $ } from "execa";

const tasks = new Listr([
	{
		title: "Run swa",
		async task(ctx) {
			await $`npm run swa`;
		},
	},
]);

const program = new Command();

program
	.command("build", { isDefault: true })
	.description("Building application")
	.option("-p,--port <port_number>", "web port", "123")
	.action(async (options) => {
		// console.log(`server on port ${options.port}`);
		const result = await tasks.run(options);
		// console.log(result);
	});
// program.option("-d, --destination", "The directory where the build will be compiled.", "./dist");
//
program.parse(process.argv);
const options = program.opts();
