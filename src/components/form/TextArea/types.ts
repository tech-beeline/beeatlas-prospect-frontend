export interface ITextArea {
    name: string;
    label: string;
    disabled?: boolean;
    fullWidth?: boolean;
    maxLength?: number;
    helperText?: string;
    error?: boolean;
    externalErrorMessage?: string;
}
