import { IStepWithBIs } from 'api/queries/cj';

import { Stage } from '../../types';

export interface IStepSettings {
    cjId: number;
    step: IStepWithBIs;
    name: string;
    setName: (name: string) => void;
    onClose: () => void;
    setStage: (stage: Stage) => void;
    setSelectedBiId: (id: number) => void;
}
