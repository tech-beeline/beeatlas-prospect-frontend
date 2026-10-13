import { ReactNode } from 'react';

import { BadgeSemantic } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

export interface ICallField {
    label: string;
    value: ReactNode;
}

export interface ICallStatus {
    iconName: Icons;
    color: BadgeSemantic;
}

export interface ICallNode {
    id: string;
    call: string;
    product: string | null;
    productTitle?: string | null;
    status: ICallStatus;
    fields: ICallField[];
    children: ICallNode[];
}

export interface ICallsWorkspace {
    calls: ICallNode[];
}
