import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	fetchWordSet,
	selectCurrentWord,
	selectStatsForWordSet,
	selectWordSet,
	setCurrentWordDone,
	setCurrentWordFailed,
} from '@root/src/store/wordSets';

import { PageData } from '@root/src/store/menu/index';

import Reset from './Reset';

export interface ResolverProps {
	pageData: PageData;
}

const Show: React.FC<ResolverProps> = ({ pageData }: ResolverProps) => {
	const { wordSetMenuData, category } = pageData;
	const { url } = wordSetMenuData;
	const dispatch = useDispatch();
	const word = useSelector(selectCurrentWord(url));
	const [progress, max] = useSelector(selectStatsForWordSet(url));
	const [userTranslation, setUserTranslation] = useState('');

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (userTranslation.trim().toLowerCase() === word.original.trim().toLowerCase()) {
			dispatch(setCurrentWordDone(url));
		} else {
			dispatch(setCurrentWordFailed(url));
		}

		setUserTranslation('');
	};

	return (
		<div>
			<header>
				<nav>
					<ol>
						<li>{category.name}</li>
						<li>{wordSetMenuData.name}</li>
						<li title={`ukończono ${progress}/${max}`}>
							{progress}/{max}
						</li>
					</ol>
				</nav>
				<Reset url={url} />
			</header>

			<div>
				<h1>{word.translation}</h1>

				{word.failed && (
					<div>
						Błąd! Poprawne tłumaczenie to <span>{word.original}</span> Wpisz je jeszcze{' '}
						<b>{word.failed}</b> razy.
					</div>
				)}

				<form onSubmit={handleFormSubmit}>
					<input
						id="to-translate"
						value={userTranslation}
						placeholder="Poprawne tłumaczenie"
						autoFocus
						autoComplete="off"
						onChange={({ target }) => setUserTranslation(target.value)}
					/>
				</form>
			</div>
		</div>
	);
};

const ShowDataResolver: React.FC<ResolverProps> = ({ pageData }: ResolverProps) => {
	const { wordSetMenuData } = pageData;
	const dispatch = useDispatch();
	const wordSetData = useSelector(selectWordSet(wordSetMenuData.url));

	useEffect(() => {
		if (!wordSetData) dispatch(fetchWordSet(wordSetMenuData.url));
	}, [dispatch, wordSetMenuData, wordSetData]);

	return (
		<div>
			{!wordSetData ? (
				'Ładowanie…'
			) : wordSetData.session.words.length ? (
				<Show pageData={pageData} />
			) : (
				<div>
					<Reset url={wordSetMenuData.url} />
					<div>
						<p>Zestaw słówek ukończony</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowDataResolver;
