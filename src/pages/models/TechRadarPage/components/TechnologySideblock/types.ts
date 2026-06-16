import { ITech } from 'api/technologies/types';

export interface ITechnologySideblock {
    selectedTech: ITech | null;
    isOpen: boolean;
    onClose: () => void;
}
