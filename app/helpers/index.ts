export const serializeToURL = (str: string): string =>
	encodeURI(str.replace(' ', '-').toLowerCase());
