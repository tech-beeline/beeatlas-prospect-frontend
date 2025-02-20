import { ErrorType } from '../../const';
import { VersionValues } from '../../form';

export interface ITechnologyVersionField {
    index: number;
    fieldsCount: number;
    isLoading: boolean;
    showAddButton: boolean;
    resetStatus: boolean;
    techRingId?: number;
    errorType: ErrorType | null;

    remove: (index: number) => void;
    append: (version: VersionValues) => void;
}
