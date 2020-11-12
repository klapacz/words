export const serialize = (str: string): string =>
    encodeURI(str.replace(' ', '-').toLowerCase());
