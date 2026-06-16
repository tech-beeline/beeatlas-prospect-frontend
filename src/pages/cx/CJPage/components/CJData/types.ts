import { ICompleteCJData } from 'api/cj/types';

export interface ICJData {
    onClose: () => void;
    isOpen: boolean;
    cj: ICompleteCJData;
}
