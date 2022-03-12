import { MenuState } from '@root/src/store/menu/types';
import { theme } from '@root/src/styled/theme';

declare module 'menu.json' {
	const value: MenuState['menu'];

	export default value;
}

type ThemeInterface = typeof theme;

declare module 'styled-components' {
	interface DefaultTheme extends ThemeInterface {}
}
