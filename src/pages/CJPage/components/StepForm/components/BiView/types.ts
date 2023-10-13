import { BI } from 'pages/CJPage/mocks';

import { Stage } from '../../types';

export interface IBiView {
    selectedBiId: number;
    setStage: (stage: Stage) => void;

    addBi?: (bi: BI) => void;
    showButtons?: boolean;
    goBackStage?: Stage;
}
