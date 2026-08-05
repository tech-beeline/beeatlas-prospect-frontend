import React from 'react';

import { AiAssistantInput, MySpaceSection, ServicesSection } from './components';
import * as S from './units';

export const NewMainPage = () => {
    return (
        <S.PageWrapper>
            <S.Content>
                <AiAssistantInput />
                <MySpaceSection />
                <ServicesSection />
            </S.Content>
        </S.PageWrapper>
    );
};
