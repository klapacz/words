import styled, { css } from 'styled-components';

export const Crumbs = styled.nav`
	> ol {
		list-style-type: none;
		padding: 0;

		> li {
			display: inline-block;

			&:not(:last-of-type)::after {
				display: inline-block;
				color: #000;
				content: '>';
				padding: 0 6px;
			}
		}
	}
`;

export const ShowHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 5px solid ${({ theme }) => theme.backgroundDark};
`;

interface Props {
	full: boolean;
}

export const StyledReset = styled.button`
	${(props: Props) =>
		props.full &&
		css`
			width: 100%;
			font-size: 120%;
			border-bottom: 5px solid ${({ theme }) => theme.backgroundDark} !important;
		`}

	border: 0;
	padding: 10px;
	font-family: inherit;
	color: #fff;
	background-color: ${({ theme }) => theme.colors.blue};
`;

export const TranslationContainer = styled.div`
	text-align: center;

	input {
		width: 100%;
		text-align: center;
		font-size: 120%;
		border: 0;
		border-top: 5px solid ${({ theme }) => theme.backgroundDark};
		padding: 10px 0;
	}
`;

export const TranslationFailed = styled.div`
	text-align: center;
	background-color: #ef3038;
	color: #fff;
	padding: 10px 5px;
	border-top: 5px solid ${({ theme }) => theme.backgroundDark};
`;

export const CorrectTranslation = styled.span`
	display: block;
	font-size: 200%;
	font-weight: bold;
`;
