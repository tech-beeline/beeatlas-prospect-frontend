import { IMapCriteria } from 'api/maps/types';

export interface ICreateCriteriaSideblock {
    isOpen: boolean;
    onClose: () => void;
    criteriaToEdit?: IMapCriteria | null;
}
