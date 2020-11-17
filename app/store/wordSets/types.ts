export interface Word {
	original: string;
	translation: string;
}

export interface WordSet {
	words?: Word[];
	session?: {
		words: Word[];
		current: number;
	};
}

export interface WordSetsState {
	wordSets: {
		[wordSetURL: string]: WordSet;
	};
}
