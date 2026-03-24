import { IBIData } from 'api/bi/types';

export interface IBITableRow {
    bi: IBIData;
    showShadow?: boolean;
    isActive?: boolean;
    onMenuToggle?: (id: number | null) => void;
}
