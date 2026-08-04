export interface ICallsContent {
    code: string;
}

export interface ITreeItem {
    id: string;
    name: string;
    children: ITreeItem[];
}
