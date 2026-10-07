import { ReactNode } from 'react';

import { ColorTypes } from 'components/ui/types';

import { Icons } from 'styles/design-tokens/js/iconfont';

export interface ICallField {
    label: string;
    value: ReactNode;
}

export interface ICallStatus {
    iconName: Icons;
    color: ColorTypes;
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
