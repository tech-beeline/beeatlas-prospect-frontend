import React from 'react';

import { ProfileIcon } from 'components/other';

import * as S from './units';

export const UserTableProfile = (props: any) => {
    return (
        <S.Wrapper>
            <ProfileIcon
                initials={props.fullName
                    .split(' ')
                    .map((word: string) => word.charAt(0))
                    .join('')}
            />

            <S.ProfileDataBlock>
                <S.FullName>{props.fullName}</S.FullName>

                <S.Email>{props.email}</S.Email>
            </S.ProfileDataBlock>
        </S.Wrapper>
    );
};
