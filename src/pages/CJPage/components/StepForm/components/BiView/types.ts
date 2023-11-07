import { IBIData } from 'api/bi/types';
import { BI } from 'pages/CJPage/mocks';

import { Stage } from '../../types';

export interface IBiView {
    selectedBiId: number;
    setStage: (stage: Stage) => void;

    addBi?: (bi: BI) => void;
    addNewBi?: (bi: IBIData) => void;
    showButtons?: boolean;
    goBackStage?: Stage;
}
