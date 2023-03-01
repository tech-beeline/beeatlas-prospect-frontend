import React from 'react';

import * as S from './units';

export const BorderContainer = (props: any) => {
    return (
        <S.Wrapper className="BorderContainerWrapper" {...props}>
            {props.children}
        </S.Wrapper>
    );
};
