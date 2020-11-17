import { State } from '..';
import { Word, WordSet } from './types';

export const selectWordSet = (wordSetURL: string) => (state: Partial<State>): WordSet =>
	state.wordSets.wordSets[wordSetURL];

export const selectSessionWordSet = (wordSetURL: string) => (
	state: Partial<State>
): WordSet['session'] => state.wordSets.wordSets[wordSetURL].session;

export const selectCurrentWord = (wordSetURL: string) => (state: Partial<State>): Word => {
	const session = state.wordSets.wordSets[wordSetURL].session;
	const word = session.words[session.current];

	return word;
};
