import { IPattern } from 'api/patterns/types';

export interface IPatternRow {
    pattern: Omit<IPattern, 'groups' | 'technologies'>;
}
