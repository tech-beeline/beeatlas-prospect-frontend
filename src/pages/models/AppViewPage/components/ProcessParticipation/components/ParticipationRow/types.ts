import { ReactNode } from 'react';

export interface IParticipationRowProps {
    title: string;
    code: string;
    url: string | null;
    methodsCount: number;
    expanded: boolean;
    children: ReactNode;
}
