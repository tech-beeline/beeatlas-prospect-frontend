import { IBIData } from 'api/bi/types';
import { Stage } from 'pages/cx/CJPage/components/StepForm/types';
// import { BI } from 'pages/CJPage/mocks';

export interface IBiItem {
    stepId: number;
    bi: IBIData;
    // newBi?: IBIData;
    index: number;
    totalLength: number;
    setSelectedBiId: (id: number) => void;
    setStage: (stage: Stage) => void;
    // removeBi: (id: number) => void;
    // moveBi: (index: number, up: boolean) => void;
}
