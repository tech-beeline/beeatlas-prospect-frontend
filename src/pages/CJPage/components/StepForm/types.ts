export interface IStepForm {
    isOpen: boolean;
    defaultName: string;
    onClose: () => void;
    renameColumn: (name: string) => void;
}
