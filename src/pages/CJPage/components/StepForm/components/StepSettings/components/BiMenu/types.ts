import { BI } from 'pages/CJPage/mocks';

export interface IBiMenu {
    bi: BI;
    index: number;
    totalLength: number;

    removeBi: (id: number) => void;
    moveBi: (index: number, up: boolean) => void;
}
