import React from 'react';

import * as S from './units';

export const ProfileIcon = ({ initials }: { initials: string }) => {
    return <S.Wrapper>{initials}</S.Wrapper>;
};
