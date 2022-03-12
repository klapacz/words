import yaml from 'js-yaml';
import fs from 'fs/promises';
import { resolve, join } from 'path';

import { constants } from 'fs';

import { walk } from 'node-os-walk';
import Ajv from 'ajv';
import { indexSchema, MenuSchema, menuSchema, wordSetSchema } from './schemas';

const pwd = process.env.PWD as string;

const ajv = new Ajv({ allowMatchingProperties: true });
const validateMenu = ajv.compile(menuSchema);
const validateWordSet = ajv.compile(wordSetSchema);
const validateIndex = ajv.compile(indexSchema);

async function generateJsonAPI(): Promise<void> {
	const apiDir = resolve(pwd, 'public/api');
	const dataDir = resolve(pwd, 'data');

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

async function generateMenu(): Promise<void> {
	const indexPath = resolve(pwd, 'data/index.yaml');
	const data = yaml.load(await fs.readFile(indexPath, { encoding: 'utf-8' }));

	if (!validateIndex(data)) {
		// TODO: error
		return;
	}

	const generatedMenu = [];

	for (const [dir, categoryName] of Object.entries(data)) {
		const categoryData: MenuSchema[0] = {
			name: categoryName,
			items: [],
		};

		const categoryPath = resolve(pwd, 'data', dir);
		const categoryFiles = await fs.readdir(categoryPath);

		for (const wordSetFilename of categoryFiles) {
			const wordSetFilePath = resolve(categoryPath, wordSetFilename);
			const wordSetFileContent = yaml.load(
				await fs.readFile(wordSetFilePath, { encoding: 'utf-8' })
			);

			const apiEndpointURL = join('/api', dir, wordSetFilename.replace(/\.yaml$/, '.json'));

			if (!validateWordSet(wordSetFileContent)) {
				// TODO: error
				return;
			}

			const wordSetData = {
				name: wordSetFileContent.name,
				url: apiEndpointURL,
			};

			categoryData.items.push(wordSetData);
		}

		generatedMenu.push(categoryData);
	}

	const menuDistDir = resolve(pwd, 'generated');
	const menuFilename = 'menu.json';

	try {
		await fs.access(menuDistDir, constants.R_OK);
	} catch {
		await fs.mkdir(menuDistDir);
	}

	await fs.writeFile(join(menuDistDir, menuFilename), JSON.stringify(generatedMenu));
}

generateMenu();
generateJsonAPI();
