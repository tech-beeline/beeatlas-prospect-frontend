import { ReactNode } from 'react';

import { IParticipationSearchOption } from '../../types';

export interface IParticipationRowProps {
    title: string;
    code: string;
    url: string | null;
    methodsCount: number;
    selection: IParticipationSearchOption | null;
    children: ReactNode;
}
