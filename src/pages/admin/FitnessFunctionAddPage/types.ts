export interface IFitnessFunctionSavedData {
    code?: string;
    name?: string;
    isTrigger?: boolean;
    type?: number;
    applicability?: string[];
    syncMethodLink?: string;
    asyncMethodLink?: string;
    scriptFile?: File | null;
    scriptCode?: string;
}
