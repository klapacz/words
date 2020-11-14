import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { State } from '..';
import { Words, WordSetsState, WordSet } from './types';

const sliceName = 'wordSets';

export const fetchWordSet = createAsyncThunk(
    `${sliceName}/fetch`,
    async (wordSetURL: string): Promise<[string, Words[]]> => {
        // TODO: error handling
        const json = await fetch(wordSetURL);
        const res = await json.json();

        return [wordSetURL, res.words];
    }
);

const initialState: WordSetsState = {
    wordSets: {},
};

export const selectWordSet = (wordSetURL: string) => (
    state: Partial<State>
): WordSet => state.wordSets.wordSets[wordSetURL];

export const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWordSet.fulfilled, (state, action) => {
            const [wordSetUrl, words] = action.payload;

            state.wordSets[wordSetUrl] = {
                words,
            };
        });
    },
});

export * from './types';

export default slice.reducer;
