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
