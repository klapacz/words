import styled, { css } from 'styled-components';

const reset = css`
	margin: 0;
	padding: 25px;
	list-style-type: none;
`;

export const Menu = styled.ul`
	${reset}
`;

export const MenuItem = styled.li`
	font-size: 1.2rem;
`;
export const SubMenu = styled.ol`
	${reset}
`;
export const SubMenuItem = styled.li`
	font-size: 1.1rem;

	> a {
		color: ${({ theme }) => theme.colors.blue};
		text-decoration: none;
	}
`;
