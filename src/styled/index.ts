import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.main`
	width: 100%;
	max-width: 700px;
	border: 1px solid #efefef;
	background-color: ${({ theme }) => theme.backgroundLight};
	margin: 5px;
`;

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	body {
		min-height: 100vh;
		margin: 0;

		font-family: sans-serif;
		color: ${({ theme }) => theme.defaultForeground}
	}

	#root {
		min-height: 100vh;
		background-color: ${({ theme }) => theme.backgroundDark};

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}
`;

export * from './menu';
