export interface IImportDataForm {
    targetId: string | null;
    isSubmitting: boolean;
    onSubmit: (file: File) => Promise<string | null>;
}
