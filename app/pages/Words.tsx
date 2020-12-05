import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBy } from '../store/menu';
import Show from '@/components/wordSet/Show';
import { PageData } from '@/store/menu/index';

interface urlParams {
	category: string;
	wordSet: string;
}

const Words: React.FC = () => {
	const {
		category: categorySerializedName,
		wordSet: wordSetSerializedName,
	}: urlParams = useParams();

	const pageData: PageData = useSelector(selectBy(categorySerializedName, wordSetSerializedName));

	if (!pageData) {
		return <main>404</main>;
	}

	return <Show pageData={pageData} />;
};

export default Words;
