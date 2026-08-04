export interface ICJImport {
    isOpen: boolean;
    onClose: () => void;
    cjId: string;
    isRefreshing: boolean;
    isEmptyCJ: boolean;
}
