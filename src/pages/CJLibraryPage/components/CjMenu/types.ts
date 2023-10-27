import { CJ } from 'pages/CJLibraryPage/mocks';

export interface ICjMenu {
    cj: CJ;
    onEditClick: () => void;
    onDeleteClick: () => void;
}
