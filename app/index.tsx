import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { default as list } from './list.json';

interface WordSet {
    name: string;
    url: string;
}

interface Category {
    name: string;
    wordSets: WordSet[];
}

type MenuData = Category[];

interface MenuProps {
    items: MenuData;
}

const Menu = (props: MenuProps) => {
    const { items } = props;

    return (
        <ul>
            {items.map(({ name: categoryName, wordSets }) => (
                <li key={categoryName}>
                    {categoryName}
                    <ol>
                        {wordSets.map(({ name: wordSetName, url }) => (
                            <li key={wordSetName}>
                                <a href={url}>{wordSetName}</a>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ul>
    );
};

const Root = () => (
    <div>
        <h1>Hello</h1>
        <Menu items={list} />
    </div>
);

ReactDOM.render(<Root />, document.getElementById('root'));
