import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	fetchWordSet,
	selectCurrentWord,
	selectStatsForWordSet,
	selectWordSet,
	setCurrentWordDone,
} from '@root/app/store/wordSets';
import { PageData } from '@/store/menu/index';

export interface ResolverProps {
	pageData: PageData;
}

export interface ShowProps {
	wordSetMenuData: PageData['wordSetMenuData'];
}

const Show: React.FC<ShowProps> = ({ wordSetMenuData }: ShowProps) => {
	const { url } = wordSetMenuData;
	const dispatch = useDispatch();
	const word = useSelector(selectCurrentWord(url));
	const [progress, max] = useSelector(selectStatsForWordSet(url));
	const [userTranslation, setUserTranslation] = useState('');

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (userTranslation.trim() === word.original.trim()) {
			dispatch(setCurrentWordDone(url));
		}

		setUserTranslation('');
	};

	return (
		<div>
			<h2>Wpisz tłumaczenie dla {word.translation}</h2>
			<label htmlFor="to-translate">Poprawne tłumaczenie</label>
			<p>
				ukończono {progress}/{max}
			</p>
			<form onSubmit={handleFormSubmit}>
				<input
					id="to-translate"
					value={userTranslation}
					autoFocus
					onChange={({ target }) => setUserTranslation(target.value)}
				/>
			</form>
		</div>
	);
};

const ShowDataResolver: React.FC<ResolverProps> = ({ pageData }: ResolverProps) => {
	const { wordSetMenuData } = pageData;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchWordSet(wordSetMenuData.url));
	}, [dispatch, wordSetMenuData]);

	const wordSetData = useSelector(selectWordSet(wordSetMenuData.url));

	return (
		<main>
			<h1>{wordSetMenuData.name}</h1>
			{!wordSetData ? (
				'Ładowanie…'
			) : wordSetData.session.words.length ? (
				<Show wordSetMenuData={wordSetMenuData} />
			) : (
				'Koniec'
			)}
		</main>
	);
};

export default ShowDataResolver;
