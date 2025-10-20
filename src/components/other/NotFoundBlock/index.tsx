import React, { FC } from 'react';
import { Button } from '@beeline/design-system-react';

import dialogBox from './images/box-with-dialog.png';
import questionBox from './images/box-with-question.png';
import emptyBox from './images/empty-box.png';
import search from './images/search.png';
import uneditable from './images/uneditable.png';

import { ImageVariants, INotFoundBlock } from './types';
import * as S from './units';

const variantToImageMap = {
    [ImageVariants.QUESTION_BOX]: questionBox,
    [ImageVariants.EMPTY_BOX]: emptyBox,
    [ImageVariants.UNEDITABLE]: uneditable,
    [ImageVariants.DIALOG_BOX]: dialogBox,
    [ImageVariants.SEARCH]: search,
};

const NotFoundBlock: FC<INotFoundBlock> = ({
    title,
    text,
    imageVariant = ImageVariants.QUESTION_BOX,
    buttonText,
    buttonProps,
}) => {
    return (
        <S.NotFoundBlock>
            <S.Image src={variantToImageMap[imageVariant]} />
            <S.Content>
                {title && <S.Title>{title}</S.Title>}
                {text && <S.Text marginTop={Boolean(title)}>{text}</S.Text>}
                {buttonText && (
                    <S.ButtonContainer>
                        <Button variant="contained" {...buttonProps}>
                            {buttonText}
                        </Button>
                    </S.ButtonContainer>
                )}
            </S.Content>
        </S.NotFoundBlock>
    );
};

export { ImageVariants, NotFoundBlock };
