import { BI } from 'pages/CJPage/mocks';

export interface IBiMenu {
    bi: BI;
    onEditClick: () => void;
    onDeleteClick: () => void;
}
