import { IPattern } from 'api/patterns/types';

export interface IPatternCard {
    isAdmin: boolean;

    pattern: IPattern;
    setPatternToDelete: (pattern: IPattern) => void;
}
