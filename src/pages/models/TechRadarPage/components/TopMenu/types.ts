export interface ITopMenu {
    activeMenuItem: number;
    isSubMenu: boolean;

    setActiveMenuItem: (value: number) => void;
}
