import gulp from 'gulp';
import gulpYaml from 'gulp-yaml';
import yaml from 'js-yaml';
import schema from 'gulp-json-schema';
import fs from 'fs';
import { resolve, join } from 'path';
import { validate } from 'jsonschema';
import menuSchema from '../data/menu.schema.json';

export function generateJsonAPI() {
	return gulp
		.src(['data/**/*.yaml', '!data/*'])
		.pipe(gulpYaml())
		.pipe(schema('data/word-set.schema.json'))
		.pipe(gulp.dest('dist/api'));
}

export function generateMenu(cb) {
	const indexPath = resolve(process.env.PWD, 'data/index.yaml');
	const data = yaml.safeLoad(fs.readFileSync(indexPath));

	const formattedData = [];

	for (const [dir, categoryName] of Object.entries(data)) {
		const categoryData = {
			name: categoryName,
			items: [],
		};

		const categoryPath = resolve(process.env.PWD, 'data', dir);
		const categoryFiles = fs.readdirSync(categoryPath);

		for (const wordSetFilename of categoryFiles) {
			const wordSetFilePath = resolve(categoryPath, wordSetFilename);
			const wordSetFileContent = yaml.safeLoad(fs.readFileSync(wordSetFilePath));

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
		cb('generated menu is invalid');
		return;
	}

	const menuDistDir = resolve(process.env.PWD, 'generated');
	const menuFilename = 'menu.json';

	if (!fs.existsSync(menuDistDir)) {
		fs.mkdirSync(menuDistDir);
	}

	fs.writeFileSync(join(menuDistDir, menuFilename), JSON.stringify(formattedData));

	cb();
}

export default gulp.series(generateJsonAPI, generateMenu);
