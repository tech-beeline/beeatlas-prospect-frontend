import { VersionValues } from '../../form';

export interface ITechnologyVersionField {
    index: number;
    fieldsCount: number;
    isLoading: boolean;
    showAddButton: boolean;
    resetStatus: boolean;
    techRingId?: number;

    remove: (index: number) => void;
    append: (version: VersionValues) => void;
}
