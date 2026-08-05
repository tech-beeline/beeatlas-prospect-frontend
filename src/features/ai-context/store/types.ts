export interface IContextStore {
    context: PageContext | null;
    setContext: (context: PageContext) => void;
    setAdditionalContext: (key: string, value: unknown) => void;
    removeAdditionalContext: (key: string) => void;
    clearAdditionalContext: () => void;
    clearContext: () => void;
}

export interface PageContext {
    pageId: string;
    entity?: PageEntity;
    pageDescription: string;
    uiState: {
        activeTab?: string;
    };
    additionalContext?: Record<string, unknown>;
}

export interface PageEntity {
    type: string;
    id: string | number;
}
