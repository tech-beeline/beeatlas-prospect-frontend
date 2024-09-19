export interface ICjMenu {
    cjId: number;
    draft: boolean;
    canEdit: boolean;
    onEditClick: () => void;
    onDeleteClick: () => void;
}
