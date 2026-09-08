export interface IImportDataForm {
    targetId: string | null;
    file: File | null;
    plantUmlText: string;
    onFileChange: (file: File | null) => void;
    onPlantUmlTextChange: (text: string) => void;
    isSubmitting: boolean;
    onSubmit: (file: File) => Promise<string | null>;
}
