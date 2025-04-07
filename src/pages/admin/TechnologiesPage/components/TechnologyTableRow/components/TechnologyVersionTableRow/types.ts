import { ITech, ITechVersion } from 'api/technologies/types';

export interface ITechnologyVersionTableRow {
    version: ITechVersion;
    technology: ITech;
}
