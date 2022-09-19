import React, { FC, useState } from 'react';

import { ReactComponent as RightArrowSVG } from './images/right-arrow.svg';

import { IProfileIcon } from './types';
import * as S from './units';

export const ProfileIcon: FC<IProfileIcon> = ({ initials, clearAuth }) => {
    const [isShowDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <S.Wrapper onClick={() => setShowDropdown(!isShowDropdown)}>{initials}</S.Wrapper>

            {/* <S.ExpandStyled isOpen={isShowDropdown}>
                <p onClick={() => clearAuth()}>Выход</p>
            </S.ExpandStyled> */}

            {isShowDropdown && (
                <S.Dropdown>
                    <S.DropdownItem>Профиль</S.DropdownItem>

                    <S.DropdownItem onClick={() => clearAuth()}>
                        Выход <RightArrowSVG />
                    </S.DropdownItem>
                </S.Dropdown>
            )}
        </>
    );
};
