export type PlantUmlInput = { file: File; plantUml?: never } | { file?: never; plantUml: string };

export interface IImportDataFormSubmitError {
    message: string;
    activeRunId?: number;
}

export interface IImportDataForm {
    isNewE2E: boolean;
    name: string;
    biStepCode: string;
    file: File | null;
    plantUmlText: string;
    onNameChange: (name: string) => void;
    onBIStepCodeChange: (code: string) => void;
    onFileChange: (file: File | null) => void;
    onPlantUmlTextChange: (text: string) => void;
    onOpenActiveRun: (runId: number) => void;
    isSubmitting: boolean;
    onSubmit: (input: PlantUmlInput) => Promise<IImportDataFormSubmitError | null>;
}
