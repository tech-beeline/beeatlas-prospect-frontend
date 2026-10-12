import { ReactNode } from 'react';

export interface IPublishCardField {
    label: string;
    value: ReactNode;
}

export interface IPublishCard {
    title: string;
    isLoading: boolean;
    descriptions: string[];
    status?: string;
    fields: IPublishCardField[];
    url: string | null;
    note?: string;
    actionLabel: string;
    onAction: () => void;
    hasData: boolean;
}
