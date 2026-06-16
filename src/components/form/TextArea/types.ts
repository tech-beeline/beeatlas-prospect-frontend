export interface ITextArea {
    name: string;
    label: string;
    disabled?: boolean;
    fullWidth?: boolean;
    maxLength?: number;
    helperText?: string;
    error?: boolean;
    externalErrorMessage?: string;
    helperPosition?: 'block' | 'absolute';
    autoFocus?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
