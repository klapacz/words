export interface Word {
	failed?: number;
	original: string;
	translation: string;
}

export interface WordSet {
	words: Word[];
	session: {
		words: Word[];
		current: number;
	};
}

export interface WordSetsState {
	wordSets: {
		[wordSetURL: string]: WordSet;
	};
}
