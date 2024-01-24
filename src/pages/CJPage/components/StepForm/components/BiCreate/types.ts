import { Stage } from '../../types';

export interface IBiCreate {
    productId: string;
    setStage: (stage: Stage) => void;
    onClose: () => void;
}
