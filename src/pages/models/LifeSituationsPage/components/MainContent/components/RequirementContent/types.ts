import { IActiveItem, ItemTypes } from '../../../../types';

export interface IRequirementContent {
    activeItem: Extract<IActiveItem, { type: ItemTypes.NFR }>;
    isAdmin: boolean;
}

export enum NfrPanelType {
    FITNESS_FUNCTIONS = 'FITNESS_FUNCTIONS',
    LIFE_SITUATIONS = 'LIFE_SITUATIONS',
    PATTERNS = 'PATTERNS',
}
