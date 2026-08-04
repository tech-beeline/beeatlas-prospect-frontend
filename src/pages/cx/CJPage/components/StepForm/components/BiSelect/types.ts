import { Stage } from '../../types';

export interface IBiSelect {
    setStage: (stage: Stage) => void;
    setSelectedBiId: (id: number) => void;
    selectedBiIds: number[];
    onClose: () => void;
}
