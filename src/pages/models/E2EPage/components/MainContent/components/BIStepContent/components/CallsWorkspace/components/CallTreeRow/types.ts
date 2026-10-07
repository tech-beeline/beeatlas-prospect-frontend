import { ICallNode } from '../../types';

export interface ICallTreeRow {
    call: ICallNode;
    level: number;
    selectedId: string | null;
    onSelect: (id: string) => void;
}
