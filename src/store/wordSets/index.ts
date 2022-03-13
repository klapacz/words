import { createSlice } from '@reduxjs/toolkit';
import { WordSetsState } from './types';
import { fetchWordSet, setCurrentWordDone, setCurrentWordFailed } from './actions';

const initialState: WordSetsState = {
	wordSets: JSON.parse(window.localStorage.getItem('wordSets') || '{}'),
};

export const slice = createSlice({
	name: 'wordSets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(setCurrentWordDone, (state, action) => {
				const wordSetURL = action.payload;
				const session = state.wordSets[wordSetURL].session;
				const { failed } = session.words[session.current];

				if (!failed || failed === 1) {
					session.words = session.words.filter(
						(word, index) => index !== session.current
					);

					const max = state.wordSets[wordSetURL].session.words.length - 1;
					const current = Math.floor(Math.random() * Math.floor(max));

					session.current = current;
					// TODO remove 'failed' property if exist

					return;
				}

				const current = session.words[session.current];
				if (current.failed) current.failed = current.failed - 1;
			})

			.addCase(setCurrentWordFailed, (state, action) => {
				const wordSetURL = action.payload;
				const session = state.wordSets[wordSetURL].session;

				if (!session.words[session.current].failed) {
					state.wordSets[wordSetURL].session.words[session.current].failed = 3;
				}
			})

			.addCase(fetchWordSet.fulfilled, (state, action) => {
				const [wordSetURL, words] = action.payload;

				const serializedWords = Object.entries(words).map(([original, translation]) => ({
					original,
					translation,
				}));

				const current = Math.floor(Math.random() * Math.floor(serializedWords.length - 1));

				const newWordSet = {
					words: serializedWords,
					session: {
						words: [...serializedWords],
						current,
					},
				};

				state.wordSets[wordSetURL] = newWordSet;
			});
	},
});

export * from './types';
export * from './selectors';
export * from './actions';

export default slice.reducer;
