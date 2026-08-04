import React from 'react';

import * as S from './units';

export const BadgeName = ({ children, ...props }: { children: React.ReactNode }) => {
    return (
        <S.BadgeName className="BadgeName" {...props}>
            {children}
        </S.BadgeName>
    );
};
