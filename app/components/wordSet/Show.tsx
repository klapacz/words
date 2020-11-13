import * as React from 'react';
import { useQuery } from 'react-query';
import { WordSet, Category } from '@/store/menu/types';

export interface Props {
    pageData: {
        category: Category;
        wordSet: WordSet;
    };
}

const Show: React.FC<Props> = ({ pageData: { category, wordSet } }: Props) => {
    const {
        isLoading,
        error,
        data,
    } = useQuery(`${category.name}/${wordSet.name}`, () =>
        fetch(wordSet.url).then((res) => res.json())
    );

    return (
        <main>
            <h1>{wordSet.name}</h1>
            {isLoading ? (
                'Ładowanie…'
            ) : error ? (
                <h2 role="alert">Błąd pobierania danych</h2>
            ) : (
                data && (
                    <pre>
                        <code>{JSON.stringify(data, null, '\t')}</code>
                    </pre>
                )
            )}
        </main>
    );
};

export default Show;
