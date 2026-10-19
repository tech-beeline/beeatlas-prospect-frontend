import { ImplementationSource } from '../../types';

export interface ISourceCard {
    source: ImplementationSource;
    biStepId: number;
    onClick: () => void;
}
