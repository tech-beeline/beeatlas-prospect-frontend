export interface ICJImport {
    isOpen: boolean;
    onClose: () => void;
    cjId: string;
    onUploaded?: () => void;
}
