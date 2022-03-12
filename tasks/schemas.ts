import { JSONSchemaType } from 'ajv';

export type MenuSchema = {
	name: string;
	items: { name: string; url: string }[];
}[];

export const menuSchema: JSONSchemaType<MenuSchema> = {
	type: 'array',
	items: {
		type: 'object',
		additionalProperties: false,
		required: ['name', 'items'],
		properties: {
			name: {
				type: 'string',
			},
			items: {
				type: 'array',
				items: {
					type: 'object',
					additionalProperties: false,
					required: ['name', 'url'],
					properties: {
						name: {
							type: 'string',
						},
						url: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export type WordSetSchema = {
	name: string;
	words: {
		[key: string]: string;
	};
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

export type IndexSchema = {
	[key: string]: string;
};

export const indexSchema: JSONSchemaType<IndexSchema> = {
	type: 'object',
	additionalProperties: false,
	required: [],
	patternProperties: {
		'^.*$': {
			type: 'string',
		},
	},
};
