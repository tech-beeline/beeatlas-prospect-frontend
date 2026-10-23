import { IRelations } from 'api/bi/types';
import { ManualCallEditor } from 'pages/cx/CJPage/components/BIEditScenario/types';

import { ImplementationSource } from '../../types';

export interface ISourceSideBlock {
    source: ImplementationSource | null;
    biStepCode: string;
    biStepId: number;
    onClose: () => void;
    onEditManual: (editor: ManualCallEditor) => void;
    onOpenDiagram: (relation: IRelations) => void;
}
