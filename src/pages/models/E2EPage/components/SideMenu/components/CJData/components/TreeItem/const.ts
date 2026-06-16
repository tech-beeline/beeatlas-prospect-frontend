import { E2ETreeItemType } from 'pages/models/E2EPage/types';

export const itemTypeToLettersMap = {
    [E2ETreeItemType.CJ]: 'CJ',
    [E2ETreeItemType.BI]: 'BI',
    [E2ETreeItemType.BI_STEP]: 'SP',
};

export const itemTypeToColorMap = {
    [E2ETreeItemType.CJ]: 'magenta',
    [E2ETreeItemType.BI]: 'teal',
    [E2ETreeItemType.BI_STEP]: 'blue',
};
