import { BI } from 'pages/CJPage/mocks';

import { Stage } from '../../types';

export interface IStepSettings {
    name: string;
    setName: (name: string) => void;
    stepBIs: BI[];
    setStepBIs: (bis: BI[]) => void;
    onClose: () => void;
    setStage: (stage: Stage) => void;
    setSelectedBiId: (id: number) => void;
    updateStep: (name: string, BIs: BI[]) => void;
}
