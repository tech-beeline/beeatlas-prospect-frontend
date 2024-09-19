import { ButtonProps } from '@beeline/design-system-react/types/components/Button/Button.types';

export enum ImageVariants {
    EMPTY_BOX = 'EMPTY_BOX',
    QUESTION_BOX = 'QUESTION_BOX',
    UNEDITABLE = 'UNEDITABLE',
}

export interface INotFoundBlock {
    title?: string;
    text?: string;
    imageVariant?: ImageVariants;
    buttonText?: string;
    buttonProps?: ButtonProps;
}
