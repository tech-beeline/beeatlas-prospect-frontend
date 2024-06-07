import { ButtonSizeVariants } from '@beeline/design-system-react/build/components/Button/Button.types';
import { Icons } from '@beeline/design-tokens/js/iconfont';

export enum ImageVariants {
    EMPTY_BOX = 'EMPTY_BOX',
    QUESTION_BOX = 'QUESTION_BOX',
    UNEDITABLE = 'UNEDITABLE',
}

export interface INotFoundBlock {
    title?: string;
    text?: string;
    imageVariant?: ImageVariants;
    buttonProps?: {
        text: string;
        onClick: () => void;
        size?: ButtonSizeVariants;
        endIconName?: Icons;
    };
}
