import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBy } from '../store/menu';
// import { useQuery } from 'react-query';

interface Params {
    category: string;
    wordSet: string;
}

const Words: React.FC = () => {
    const {
        category: categorySerializedName,
        wordSet: wordSetSerializedName,
    }: Params = useParams();

    const pageData = useSelector(
        selectBy(categorySerializedName, wordSetSerializedName)
    );

    if (!pageData) {
        return <main>404</main>;
    }

    const [category, wordSet] = pageData;
    // const { isLoading, error, data } = useQuery('repoData', () =>
    //     fetch(
    //         'https://api.github.com/repos/tannerlinsley/react-query'
    //     ).then((res) => res.json())
    // );

    return (
        <main>
            <h1>{wordSet.name}</h1>
        </main>
    );
};

export default Words;
