import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWordSet, selectWordSet, WordSet } from '@root/app/store/wordSets';
import { PageData } from '@/store/menu/index';

export interface ResolverProps {
    pageData: PageData;
}

export interface ShowProps {
    pageData: PageData;
    wordSetData: WordSet;
}

const Show: React.FC<ShowProps> = ({ wordSetData }: ShowProps) => (
    <pre>
        <code>{JSON.stringify(wordSetData, null, '\t')}</code>
    </pre>
);

const ShowDataResolver: React.FC<ResolverProps> = ({
    pageData,
}: ResolverProps) => {
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
            ) : (
                <Show pageData={pageData} wordSetData={wordSetData} />
            )}
        </main>
    );
};

export default ShowDataResolver;
