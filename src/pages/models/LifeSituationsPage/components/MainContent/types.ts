import { IActiveItem } from '../../types';

export interface IMainContent {
    activeItem: IActiveItem | null;
    setActiveItem: (activeItem: IActiveItem) => void;
    isAdmin: boolean;
    isLoading: boolean;
}
