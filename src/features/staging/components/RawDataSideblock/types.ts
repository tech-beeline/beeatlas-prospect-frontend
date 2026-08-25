export interface ISideblockData {
    rawData: string;
    title: string;
}

export interface IRawDataSideblock {
    isOpen: boolean;
    onClose: () => void;
    data: ISideblockData | null;
}
