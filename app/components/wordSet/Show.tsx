import * as React from 'react';
import { WordSet, Category } from '@/store/menu/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWordSet, selectWordSet } from '@root/app/store/wordSets';

export interface Props {
    pageData: {
        category: Category;
        wordSet: WordSet;
    };
}

const Show: React.FC<Props> = ({ pageData: { category, wordSet } }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWordSet(wordSet.url));
    }, [dispatch, wordSet]);

    const wordSetData = useSelector(selectWordSet(wordSet.url));

    return (
        <main>
            <h1>{wordSet.name}</h1>
            {!wordSetData ? (
                'Ładowanie…'
            ) : (
                <pre>
                    <code>{JSON.stringify(wordSetData, null, '\t')}</code>
                </pre>
            )}
        </main>
    );
};

export default Show;
