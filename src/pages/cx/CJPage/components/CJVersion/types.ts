import { IBPMNFileVersion } from 'api/cj/types';

export interface ICJVersion {
    isOpen: boolean;
    onClose: () => void;
    versions?: IBPMNFileVersion[];
    cjId: string | null;
}
