import Ajv, { JSONSchemaType } from 'ajv';

export type WordSetSchema = {
	name: string;
	words: Record<string, string>;
};

export const wordSetSchema: JSONSchemaType<WordSetSchema> = {
	type: 'object',
	additionalProperties: false,
	required: ['name', 'words'],
	properties: {
		name: {
			type: 'string',
		},
		words: {
			type: 'object',
			additionalProperties: false,
			required: [],
			patternProperties: {
				'^.*$': {
					type: 'string',
				},
			},
		},
	},
};

export type IndexSchema = Record<string, Record<string, string>>;

export const indexSchema: JSONSchemaType<IndexSchema> = {
	type: 'object',
	additionalProperties: false,
	required: [],
	patternProperties: {
		'^.*$': {
            type: 'object',
            additionalProperties: false,
            required: [],
            patternProperties: {
                '^.*$': {
                    type: 'string',
                },
            },
		},
	},
};

const ajv = new Ajv({ allowMatchingProperties: true });
export const validateWordSet = ajv.compile(wordSetSchema);
export const validateIndex = ajv.compile(indexSchema);
