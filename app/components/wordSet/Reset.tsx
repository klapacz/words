import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWordSet } from '@root/app/store/wordSets';
import { StyledReset } from '@root/app/styled/wordSet';

interface ResetProps {
	url: string;
	full?: boolean;
}

const Reset: React.FC<ResetProps> = ({ url, full = false }: ResetProps) => {
	const dispatch = useDispatch();

	return (
		<StyledReset full={full} onClick={() => dispatch(fetchWordSet(url))}>
			Resetuj
		</StyledReset>
	);
};

export default Reset;
