import { ReactNode } from 'react';

import { IUsecaseCallNode } from '../../types';

export interface ICallDetails {
    call: IUsecaseCallNode | null;
}

export interface ICallDetailsField {
    label: string;
    value: ReactNode;
}
