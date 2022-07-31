export interface IExpand {
    isOpen: boolean;
    setOpen?: (value: boolean) => void;
    seconds?: number;
    autoClose?: boolean;
    transition?: number;
    isClickable?: boolean;
    isHeightCalc?: boolean;
    display?: 'flex' | 'block';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'flex-end' | 'center';
    children: any;
}

export interface IExpandWrapper
    extends Pick<IExpand, 'isOpen' | 'transition' | 'isClickable' | 'isHeightCalc'> {
    height: number;
    isHidden: boolean;
    isOpacityMode?: boolean;
}
