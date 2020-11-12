import { MenuState } from '@/store/menu/types';

declare module 'menu.json' {
    const value: MenuState['menu'];

    export default value;
}
