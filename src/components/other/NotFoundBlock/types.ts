import { ReactNode } from 'react';

import { ButtonProps } from 'components/ui';

export enum ImageVariants {
    EMPTY_BOX = 'EMPTY_BOX',
    QUESTION_BOX = 'QUESTION_BOX',
    UNEDITABLE = 'UNEDITABLE',
    DIALOG_BOX = 'DIALOG_BOX',
    SEARCH = 'SEARCH',
    CHECK = 'CHECK',
}

export interface INotFoundBlock {
    title?: string;
    text?: ReactNode;
    imageVariant?: ImageVariants;
    buttonText?: string;
    buttonProps?: ButtonProps;
    setMinSize?: boolean;
    smallImage?: boolean;
}
