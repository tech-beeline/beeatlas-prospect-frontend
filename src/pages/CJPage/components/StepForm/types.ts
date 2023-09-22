import { BI } from 'pages/CJPage/mocks';
export interface IStepForm {
    isOpen: boolean;
    defaultName: string;
    onClose: () => void;
    renameColumn: (name: string) => void;
    addBI: (data: BI) => void;
    stepBIs: BI[];
}
