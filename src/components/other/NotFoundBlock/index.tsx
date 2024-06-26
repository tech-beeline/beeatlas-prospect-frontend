import React, { FC } from 'react';
import { Button } from '@beeline/design-system-react';

import questionBox from './images/box-with-question.png';
import emptyBox from './images/empty-box.png';
import uneditable from './images/uneditable.png';

import { ImageVariants, INotFoundBlock } from './types';
import * as S from './units';

const variantToImageMap = {
    [ImageVariants.QUESTION_BOX]: questionBox,
    [ImageVariants.EMPTY_BOX]: emptyBox,
    [ImageVariants.UNEDITABLE]: uneditable,
};

const NotFoundBlock: FC<INotFoundBlock> = ({
    title,
    text = 'Такой страницы не существует или указана неверная ссылка',
    imageVariant = ImageVariants.QUESTION_BOX,
    buttonText,
    buttonProps,
}) => {
    return (
        <S.NotFoundBlock>
            <S.Image src={variantToImageMap[imageVariant]} />
            <S.Content>
                {title && <S.Title>{title}</S.Title>}
                <S.Text marginTop={Boolean(title)}>{text}</S.Text>
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
