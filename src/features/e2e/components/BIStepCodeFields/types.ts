export interface IBIStepCodeFields {
    value: string;
    onChange: (value: string) => void;
    biId?: number | null;
    biCode?: string | null;
    disabled?: boolean;
}
