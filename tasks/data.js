import gulp from 'gulp';
import gulpYaml from 'gulp-yaml';
import yaml from 'js-yaml';
import schema from 'gulp-json-schema';
import fs from 'fs';
import { resolve, join } from 'path';

function compile() {
    return gulp
        .src(['data/**/*.yaml', '!data/*'])
        .pipe(gulpYaml())
        .pipe(schema('data/schema.json'))
        .pipe(gulp.dest('dist/api'));
}

function createIndex() {
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

    fs.writeFileSync(
        resolve(process.env.PWD, 'data/menu.json'),
        JSON.stringify(formattedData)
    );
}

export default gulp.series(compile, createIndex);
