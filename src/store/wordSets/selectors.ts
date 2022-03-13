import { State } from '..';
import { Word, WordSet } from './types';

export const selectWordSet =
	(wordSetURL: string) =>
	(state: State): WordSet =>
		state.wordSets.wordSets[wordSetURL];

export const selectSessionWordSet =
	(wordSetURL: string) =>
	(state: State): WordSet['session'] =>
		selectWordSet(wordSetURL)(state).session;

export const selectCurrentWord =
	(wordSetURL: string) =>
	(state: State): Word => {
		const session = state.wordSets.wordSets[wordSetURL].session;
		const word = session.words[session.current];

		return word;
	};

export const selectStatsForWordSet =
	(wordSetURL: string) =>
	(state: State): [progress: number, max: number] => {
		const wordSet = state.wordSets.wordSets[wordSetURL];

		return [wordSet.words.length - wordSet.session.words.length, wordSet.words.length];
	};
