export interface IUsecaseCallsContent {
    biStepCode: string;
    selectedId: string | null;
    onSelect: (id: string) => void;
}
