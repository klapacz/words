interface ItemEntity {
    name: string;
    url: string;
}

interface CategoryEntity {
    name: string;
    items: ItemEntity[];
}

type MenuEntity = CategoryEntity[];

export { ItemEntity, CategoryEntity };
export default MenuEntity;
