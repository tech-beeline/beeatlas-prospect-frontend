export enum FeelingTypes {
    SAD = 'SAD',
    ANNOYED = 'ANNOYED',
    NORMAL = 'NORMAL',
    HAPPY = 'HAPPY',
    EXCITED = 'EXCITED',
}

export interface IIconFeeling {
    type: FeelingTypes;
    onClick?: () => void;
    isActive?: boolean;
}
