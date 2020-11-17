const { compilerOptions } = require('./tsconfig.json');
const { defaults: presets } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { transform } = presets;

module.exports = {
	roots: ['<rootDir>/app'],
	transform,
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>',
	}),
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
		'whatwg-fetch',
		'<rootDir>/tests/helpers.tsx',
	],
};
