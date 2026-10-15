export interface TextareaChipsProps {
    value: string[];
    onChange: (value: string[]) => void;
    onBlur?: () => void;
    name?: string;
    label: string;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
}
