export interface IPostSessionForm {
    userId: number;
    message: string;
    uiContext?: string;
}

export interface IPostMessageForm {
    message: string;
    uiContext?: string;
}

export interface IPostSessionResponse {
    key: string;
    status: 'process' | 'ready' | 'error';
}

export interface ISession {
    key: string;
    userId: number;
    lastMessage: string;
    status: 'process' | 'ready' | 'error';
    sumContext: string | null;
    uiContext: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ISessionMessage {
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
}
