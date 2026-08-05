import { ReactNode } from 'react';
import { ChatHistorySection } from 'features/ai/components/AiChat/types';

export interface IHistoryDropDown {
    children: ReactNode;
    sessions: ChatHistorySection[];
}
