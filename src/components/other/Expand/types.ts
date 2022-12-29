interface ICoomonTypes {
    isOpen: boolean;
    transition?: number;
    isClickable?: boolean;
    /* указывает является ли высота автоматической/динамической */
    isHeightCalc?: boolean;
    isHorizontal?: boolean;
    /* надо чтобы указать должна ли высота считаться автоматически, надо для совмещения горизонтального и вертикального expand */
    isAutoHeight?: boolean;
    /* надо чтобы указать должна ли ширина считаться автоматически */
    isAutoWidth?: boolean;

    // для раскрытия в меню
    menuId?: number;
    treeExpandArray?: number[];
}

export interface IExpand extends ICoomonTypes {
    setOpen?: (value: boolean) => void;
    seconds?: number;
    autoClose?: boolean;
    display?: 'flex' | 'block';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'flex-end' | 'center';
    children?: React.ReactNode;
}

export interface IExpandWrapper extends ICoomonTypes {
    height: number;
    width: number;
    isHidden: boolean;
    isOpacityMode?: boolean;
    isAutoHeightClose?: boolean;
}
