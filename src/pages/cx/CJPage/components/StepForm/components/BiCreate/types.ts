import { Stage } from '../../types';

export interface IBiCreate {
    productId: string;
    stepId: number;
    stepBisLength: number;
    setStage: (stage: Stage) => void;
    onClose: () => void;
}
