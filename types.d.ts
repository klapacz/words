import { MenuState } from '@/store/menu/types';
import { theme } from '@/styled/theme';

declare module 'menu.json' {
	const value: MenuState['menu'];

	export default value;
}

type ThemeInterface = typeof theme;

declare module 'styled-components' {
	interface DefaultTheme extends ThemeInterface {}
}
