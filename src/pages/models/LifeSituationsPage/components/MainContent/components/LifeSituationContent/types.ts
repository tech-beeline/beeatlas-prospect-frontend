import { IActiveItem, ItemTypes } from '../../../../types';

export enum ContentTypeOptions {
    REQUIREMENTS = 'REQUIREMENTS',
    PATTERNS = 'PATTERNS',
}

export enum DisplayOptions {
    TABLE = 'TABLE',
    GRID = 'GRID',
}

export interface ILifeSituationContent {
    activeItem: Extract<IActiveItem, { type: ItemTypes.CHAPTER }>;
    isAdmin: boolean;
}
