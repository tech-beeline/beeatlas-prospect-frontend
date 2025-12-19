import { ICompleteCJData } from 'api/cj/types';

export interface IInfoSidesheet {
    onClose: () => void;
    cj: ICompleteCJData;
}
