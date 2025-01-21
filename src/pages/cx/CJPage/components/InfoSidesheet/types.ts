import { ICompleteCJData } from 'api/cj/types';

export interface IInfoSidesheet {
    isOpen: boolean;
    onClose: () => void;
    cj: ICompleteCJData;
}
