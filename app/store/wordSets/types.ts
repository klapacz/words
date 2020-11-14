export type Words = [original: string, translation: string];

export interface WordSet {
    words?: Words[];
}

export interface WordSetsState {
    wordSets: {
        [wordSetURL: string]: WordSet;
    };
}
