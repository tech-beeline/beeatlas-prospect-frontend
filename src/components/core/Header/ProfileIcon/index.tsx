import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { useOutsideClick } from 'hooks/useOutsideClick';
import * as ROUTER from 'router/const';

import { IProfileIcon } from './types';
import * as S from './units';

export const ProfileIcon: FC<IProfileIcon> = ({ initials, clearAuth, isPersonalArea }) => {
    const [isShowDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown);

    return (
        <>
            <S.Wrapper onClick={() => setShowDropdown(!isShowDropdown)}>{initials}</S.Wrapper>

            {/* <S.ExpandStyled isOpen={isShowDropdown}>
                <p onClick={() => clearAuth()}>Выход</p>
            </S.ExpandStyled> */}

            {isShowDropdown && (
                // <S.BlurContainer onClick={() => setShowDropdown(false)}>
                <S.Dropdown ref={dropdownRef}>
                    <S.DropdownItem>Профиль</S.DropdownItem>
                    <S.DropdownItem
                        onClick={() =>
                            navigate(
                                !isPersonalArea ? ROUTER.PERSONAL_AREA_PATH : ROUTER.MAIN_PAGE_PATH,
                            )
                        }
                    >
                        {!isPersonalArea ? 'Админка' : 'Вернуться в продукт'}{' '}
                        <Icon iconName={Icons.OpenInWindow} />
                    </S.DropdownItem>

                    <S.DividerStyled />

                    <S.DropdownItem onClick={() => clearAuth()}>
                        Выход <Icon iconName={Icons.NavArrowRight} />
                    </S.DropdownItem>
                </S.Dropdown>
                // </S.BlurContainer>
            )}
        </>
    );
};
