export const serializeToURL = (str: string): string =>
	encodeURI(str.replace(/ /g, '-').toLowerCase());
