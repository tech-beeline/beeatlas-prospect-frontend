import { ISessionMessage } from 'api/ai-chat/types';

export interface IMessage {
    message: ISessionMessage;
    isLoading?: boolean;
    error?: boolean;
    contextLabel?: string;
}

export interface SplitSentenceResult {
    firstSentence: string;
    rest: string;
}
