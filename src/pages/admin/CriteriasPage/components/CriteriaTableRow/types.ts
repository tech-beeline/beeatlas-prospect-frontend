import { IMapCriteria } from 'api/maps/types';

export interface ICriteriaTableRow {
    criteria: IMapCriteria;
    onCriteriaEdit: (criteria: IMapCriteria) => void;
    setCriteriaToDelete: (criteria: IMapCriteria) => void;
}
