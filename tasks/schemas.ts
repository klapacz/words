import { JSONSchemaType } from 'ajv';

export type Menu = {
	name: string;
	items: { name: string; url: string }[];
}[];

export const menuSchema: JSONSchemaType<Menu> = {
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
} as const;

export type WordSet = {
	name: string;
	words: {
		[key: string]: string;
	};
};

export const wordSetSchema: JSONSchemaType<WordSet> = {
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
