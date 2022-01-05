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
} from '@root/app/store/wordSets';

import { Container } from '@/styled';

import { PageData } from '@/store/menu/index';

import Reset from './Reset';
import {
	Crumbs,
	ShowHeader,
	TranslationContainer,
	TranslationFailed,
	CorrectTranslation,
} from '@root/app/styled/wordSet';

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
			<ShowHeader>
				<Crumbs>
					<ol>
						<li>{category.name}</li>
						<li>{wordSetMenuData.name}</li>
						<li title={`ukończono ${progress}/${max}`}>
							{progress}/{max}
						</li>
					</ol>
				</Crumbs>
				<Reset url={url} />
			</ShowHeader>

			<TranslationContainer>
				<h1>{word.translation}</h1>

				{word.failed && (
					<TranslationFailed>
						Błąd! Poprawne tłumaczenie to{' '}
						<CorrectTranslation>{word.original}</CorrectTranslation> Wpisz je jeszcze{' '}
						<b>{word.failed}</b> razy.
					</TranslationFailed>
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
			</TranslationContainer>
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
		<Container>
			{!wordSetData ? (
				'Ładowanie…'
			) : wordSetData.session.words.length ? (
				<Show pageData={pageData} />
			) : (
				<div>
					<Reset full={true} url={wordSetMenuData.url} />
					<TranslationContainer>
						<p>Zestaw słówek ukończony</p>
					</TranslationContainer>
				</div>
			)}
		</Container>
	);
};

export default ShowDataResolver;
