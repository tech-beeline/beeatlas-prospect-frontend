import { ICompleteStepData } from 'api/cj/types';

import { Stage } from '../../types';

export interface IStepSettings {
    cjId: number;
    step: ICompleteStepData;
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    onClose: () => void;
    setStage: (stage: Stage) => void;
    setSelectedBiId: (id: number) => void;
}
