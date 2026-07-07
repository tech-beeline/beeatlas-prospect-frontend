import { ISession } from 'api/ai-chat/types';

export interface IHistoryItem {
    session: ISession;
    handleSessionClick: (sessionKey: string) => void;
}
