export enum FeelingTypes {
    SAD = 'SAD',
    SLIGHTLY_SAD = 'SLIGHTLY_SAD',
    NORMAL = 'NORMAL',
    HAPPY = 'HAPPY',
    EXCITED = 'EXCITED',
}

export interface IIconFeeling {
    type: FeelingTypes;
    onClick?: () => void;
    isActive?: boolean;
}
