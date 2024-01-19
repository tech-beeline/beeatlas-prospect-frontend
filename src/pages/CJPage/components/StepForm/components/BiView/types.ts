import { Stage } from '../../types';

export interface IBiView {
    stepId: number;
    stepBisLength: number;
    selectedBiId: number;
    setStage: (stage: Stage) => void;
    onClose: () => void;

    showButtons?: boolean;
    goBackStage?: Stage;
}
