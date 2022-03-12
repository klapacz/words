import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import env from '@root/src/env';
import join from 'url-join';

export const fetchWordSet = createAsyncThunk(
	`wordSets/fetch`,
	async (wordSetURL: string): Promise<[string, [original: string, translation: string]]> => {
		const json = await fetch(join(env.BASE_URL, wordSetURL));
		const res = await json.json();

		return [wordSetURL, res.words];
	}
);

export const setCurrentWordDone = createAction<string>('wordSets/setWordDone');
export const setCurrentWordFailed = createAction<string>('wordSets/setCurrentWordFailed ');
