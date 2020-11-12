import * as React from 'react';
import { useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';

const Words: React.FC = () => {
    const {
        category,
        wordSet,
    }: { category: string; wordSet: string } = useParams();

    // const { isLoading, error, data } = useQuery('repoData', () =>
    //     fetch(
    //         'https://api.github.com/repos/tannerlinsley/react-query'
    //     ).then((res) => res.json())
    // );

    return (
        <main>
            /{category}/{wordSet}
        </main>
    );
};

export default Words;
