import gulp from 'gulp';
import gulpYaml from 'gulp-yaml';
import yaml from 'js-yaml';
import schema from 'gulp-json-schema';
import fs from 'fs';
import { resolve, join } from 'path';
import { validate } from 'jsonschema';
import menuSchema from '../data/menu.schema.json';

function compile() {
    return gulp
        .src(['data/**/*.yaml', '!data/*'])
        .pipe(gulpYaml())
        .pipe(schema('data/word-set.schema.json'))
        .pipe(gulp.dest('dist/api'));
}

function createIndex(cb) {
    const indexPath = resolve(process.env.PWD, 'data/index.yaml');
    const data = yaml.safeLoad(fs.readFileSync(indexPath));

    const formattedData = [];

    for (const [dir, categoryName] of Object.entries(data)) {
        const categoryData = {
            name: categoryName,
            wordSets: [],
        };

        const categoryPath = resolve(process.env.PWD, 'data', dir);
        const categoryFiles = fs.readdirSync(categoryPath);

        for (const wordSetFilename of categoryFiles) {
            const wordSetFilePath = resolve(categoryPath, wordSetFilename);
            const wordSetFileContent = yaml.safeLoad(
                fs.readFileSync(wordSetFilePath)
            );

            const wordSetData = {
                name: wordSetFileContent.name,
                url: join(
                    '/api',
                    dir,
                    wordSetFilename.replace(/\.yaml$/, '.json')
                ),
            };

            categoryData.wordSets.push(wordSetData);
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

    fs.writeFileSync(
        join(menuDistDir, menuFilename),
        JSON.stringify(formattedData)
    );
}

export default gulp.series(compile, createIndex);
