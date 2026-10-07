import { ICallNode } from './types';

export const findCall = (calls: ICallNode[], id: string | null): ICallNode | null => {
    for (const call of calls) {
        if (call.id === id) return call;
        const child = findCall(call.children, id);
        if (child) return child;
    }
    return null;
};
