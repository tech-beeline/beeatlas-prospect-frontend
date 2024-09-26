import { Dispatch, SetStateAction } from 'react';

export interface IViewItemSwitcher {
    activeElement: number;
    setActiveElement: Dispatch<SetStateAction<number>>;
}
