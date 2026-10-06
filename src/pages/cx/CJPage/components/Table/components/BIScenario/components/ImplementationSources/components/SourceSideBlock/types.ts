import { IRelations } from 'api/bi/types';

import { ImplementationSource } from '../../types';

export interface ISourceSideBlock {
    source: ImplementationSource | null;
    onClose: () => void;
    onEditManual: () => void;
    onOpenDiagram: (relation: IRelations) => void;
}
