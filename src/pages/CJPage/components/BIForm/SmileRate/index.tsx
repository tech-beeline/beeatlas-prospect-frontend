import React from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import * as S from './units';

export const SmileRate = () => {
    return (
        <S.Wrapper>
            <S.IconStyled iconName={Icons.EmojiSad} type="error" />
            <S.IconStyled iconName={Icons.EmojiSad} type="warning" />
            <S.IconStyled iconName={Icons.Emoji} type="default" />
            <S.IconStyled iconName={Icons.Emoji} type="info" />
            <S.IconStyled iconName={Icons.Emoji} type="success" />
        </S.Wrapper>
    );
};
