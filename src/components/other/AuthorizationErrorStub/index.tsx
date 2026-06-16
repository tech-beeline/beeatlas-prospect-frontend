import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from '../NotFoundBlock';

import * as S from './units';

export const AuthorizationErrorStub: FC = () => (
    <>
        <S.PageWrapper>
            <NotFoundBlock
                imageVariant={ImageVariants.QUESTION_BOX}
                title="Ошибка авторизации"
                text="Попробуйте перезагрузить страницу"
            />
        </S.PageWrapper>
    </>
);
