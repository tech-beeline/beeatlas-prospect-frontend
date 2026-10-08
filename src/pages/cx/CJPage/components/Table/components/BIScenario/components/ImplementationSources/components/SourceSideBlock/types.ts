import { IRelations } from 'api/bi/types';

import { ImplementationSource } from '../../types';

export interface ISourceSideBlock {
    source: ImplementationSource | null;
    biStepCode: string;
    onClose: () => void;
    onEditManual: () => void;
    onOpenDiagram: (relation: IRelations) => void;
}
