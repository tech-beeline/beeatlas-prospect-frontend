import React from 'react';

import { InDevelopingMock } from './InDevelopingMock';
import * as S from './units';

export const TechPolicyPage = () => {
    return (
        <S.PageWrapper>
            <S.Title>Техническая политика</S.Title>
            <S.Description>
                — документ, который содержит комплекс правил, принципов и понятий, которыми
                необходимо руководствоваться при принятии решений, связанных с изменением
                и развитием ИТ-ландшафта ПАО «ВымпелКом» и его составляющих.
            </S.Description>

            <InDevelopingMock />
        </S.PageWrapper>
    );
};
