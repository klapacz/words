import styled, { createGlobalStyle, css } from 'styled-components';

const subtleShadow = css`
	box-shadow: 0 0 1px rgba(34, 25, 25, 0.4);
`;

export const Container = styled.main`
	width: 100%;
	max-width: 700px;
	${subtleShadow}
	background-color: ${({ theme }) => theme.backgroundLight};
	margin: 5px;
`;

export const GlobalStyle = createGlobalStyle`
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
