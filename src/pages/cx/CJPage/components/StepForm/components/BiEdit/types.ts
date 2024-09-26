import { Stage } from '../../types';

export interface IBiEdit {
    selectedBiId: number | null;
    setStage: (stage: Stage) => void;
    onClose: () => void;

    previousStage?: Stage;
}
