import React from 'react';

import { Link } from 'components/other';

import * as S from './units';

export const TechPolicyPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.Title className="Title">Техническая политика</S.Title>
            <S.Description className="Description">
                — документ, который содержит комплекс правил, принципов и понятий, которыми
                необходимо руководствоваться при принятии решений, связанных с изменением
                и развитием ИТ-ландшафта ПАО «ВымпелКом» и его составляющих.
            </S.Description>
            <S.Description>
                Актуальную версию технической политики вы можете найти в{' '}
                <Link
                    showOuterIcon
                    title="BeeWorks Docs"
                    url="https://docs.bw.vimpelcom.ru/techpolicy/"
                />
            </S.Description>
        </S.PageWrapper>
    );
};
