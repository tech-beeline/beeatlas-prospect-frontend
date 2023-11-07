import { IBIData } from 'api/bi/types';
import { BI } from 'pages/CJPage/mocks';

import { Stage } from '../../types';

export interface IStepSettings {
    cjId: number;
    stepId: number;
    stepOrder: number;
    name: string;
    setName: (name: string) => void;
    stepBIs: BI[];
    setStepBIs: (bis: BI[]) => void;
    newStepBis: IBIData[];
    setNewStepBis: (bis: IBIData[]) => void;
    onClose: () => void;
    setStage: (stage: Stage) => void;
    setSelectedBiId: (id: number) => void;
    updateStep: (name: string, BIs: BI[]) => void;
}
