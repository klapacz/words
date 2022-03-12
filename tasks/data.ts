import yaml from 'js-yaml';
import fs from 'fs/promises';
import { resolve, join } from 'path';
import { validate } from 'jsonschema';
import menuSchema from '../data/menu.schema.json';
import { exit } from 'process';

import { constants } from 'fs';

import { walk } from 'node-os-walk';

async function generateJsonAPI(): Promise<void> {
	const apiDir = resolve(process.env.PWD, 'dist/api');
	const dataDir = resolve(process.env.PWD, 'data');

	for await (const [root, dirs, files] of walk(dataDir)) {
		const getDistLocation = (name: string) => {
			const curr = resolve(root, name);
			const dist = curr.replace(dataDir, apiDir).replace(/yaml$/, 'json');
			return [curr, dist] as const;
		};

		for (const dir of dirs) {
			const [, dist] = getDistLocation(dir.name);
			await fs.mkdir(dist, { recursive: true });
		}
		for (const file of files) {
			const [curr, dist] = getDistLocation(file.name);
			const input = await fs.readFile(curr, { encoding: 'utf-8' });
			const data = yaml.load(input);
			const output = JSON.stringify(data);

			await fs.writeFile(dist, output);
		}
	}
}

type WordSetData = {
	name: string;
	url: string;
};

async function generateMenu(): Promise<void> {
	const indexPath = resolve(process.env.PWD, 'data/index.yaml');
	const data = yaml.load(await fs.readFile(indexPath, { encoding: 'utf-8' }));

	const formattedData = [];

	for (const [dir, categoryName] of Object.entries(data)) {
		const categoryData = {
			name: categoryName,
			items: [] as WordSetData[],
		};

		const categoryPath = resolve(process.env.PWD, 'data', dir);
		const categoryFiles = await fs.readdir(categoryPath);

		for (const wordSetFilename of categoryFiles) {
			const wordSetFilePath = resolve(categoryPath, wordSetFilename);
			const wordSetFileContent = yaml.load(
				await fs.readFile(wordSetFilePath, { encoding: 'utf-8' })
			);

			const apiEndpointURL = join('/api', dir, wordSetFilename.replace(/\.yaml$/, '.json'));

			const wordSetData = {
				name: wordSetFileContent.name,
				url: apiEndpointURL,
			};

			categoryData.items.push(wordSetData);
		}

		formattedData.push(categoryData);
	}

	const validationResponse = validate(formattedData, menuSchema, {
		required: true,
	});

	if (!validationResponse.valid) {
		console.error('generated menu is invalid');
		exit(1);
	}

	const menuDistDir = resolve(process.env.PWD, 'generated');
	const menuFilename = 'menu.json';

	try {
		await fs.access(menuDistDir, constants.R_OK);
	} catch {
		await fs.mkdir(menuDistDir);
	}

	await fs.writeFile(join(menuDistDir, menuFilename), JSON.stringify(formattedData));
}

generateMenu();
generateJsonAPI();
