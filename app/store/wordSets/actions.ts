import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWordSet = createAsyncThunk(
	`wordSets/fetch`,
	async (wordSetURL: string): Promise<[string, [original: string, translation: string]]> => {
		// TODO: error handling
		const json = await fetch(wordSetURL);
		const res = await json.json();

		return [wordSetURL, res.words];
	}
);

export const setCurrentWordDone = createAction<string>('wordSets/setWordDone');
export const setCurrentWordFailed = createAction<string>('wordSets/setCurrentWordFailed ');
