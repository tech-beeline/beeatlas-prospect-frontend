import { ITech } from 'api/technologies/types';

export interface ITableRow {
    technology: ITech;
    setTechToDelete: (tech: ITech) => void;
}
