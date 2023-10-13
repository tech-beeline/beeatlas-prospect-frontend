import { Stage } from 'pages/CJPage/components/StepForm/types';
import { BI } from 'pages/CJPage/mocks';

export interface IBiItem {
    bi: BI;
    index: number;
    totalLength: number;
    setSelectedBiId: (id: number) => void;
    setStage: (stage: Stage) => void;
    removeBi: (id: number) => void;
    moveBi: (index: number, up: boolean) => void;
}
