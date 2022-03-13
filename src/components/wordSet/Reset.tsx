import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWordSet } from '@root/src/store/wordSets';

interface ResetProps {
	url: string;
	full?: boolean;
}

const Reset: React.FC<ResetProps> = ({ url }: ResetProps) => {
	const dispatch = useDispatch();

	return <button onClick={() => dispatch(fetchWordSet(url))}>Resetuj</button>;
};

export default Reset;
