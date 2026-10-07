import { IUsecaseCallNode } from '../../types';

export interface IUsecaseCallTreeItem {
    call: IUsecaseCallNode;
    level: number;
    selectedId: string | null;
    onSelect: (id: string) => void;
}
