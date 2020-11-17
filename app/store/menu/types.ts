export interface WordSet {
	name: string;
	url: string;
}

export interface Category {
	name: string;
	items: WordSet[];
}

export interface MenuState {
	menu: Category[];
}
