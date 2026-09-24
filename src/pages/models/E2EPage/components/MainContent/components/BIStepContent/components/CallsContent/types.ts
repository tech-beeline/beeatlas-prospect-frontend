export interface ICallsContent {
    e2eCodes: string[];
}

export interface ITreeItem {
    id: string;
    name: string;
    children: ITreeItem[];
}
