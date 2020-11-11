import MenuEntity from '@/model/menu';

declare module 'menu.json' {
    const value: MenuEntity;

    export default value;
}
