import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { Nullable } from 'types/common';

import { useOutsideClick } from 'hooks/useOutsideClick';
import * as ROUTER from 'router/const';

import { IProfileIcon } from './types';
import * as S from './units';

export const ProfileIcon: FC<IProfileIcon> = ({ initials, clearAuth, isPersonalArea }) => {
    const [isShowDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const profileIconRef = useRef<Nullable<HTMLElement>>(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown, profileIconRef);

    return (
        <>
            <S.Wrapper
                className="ProfileIconWrapper"
                onClick={() => setShowDropdown(!isShowDropdown)}
                ref={profileIconRef as any}
            >
                {initials}
            </S.Wrapper>

            {/* <S.ExpandStyled isOpen={isShowDropdown}>
                <p onClick={() => clearAuth()}>Выход</p>
            </S.ExpandStyled> */}

            {isShowDropdown && (
                // <S.BlurContainer onClick={() => setShowDropdown(false)}>
                <S.Dropdown className="Dropdown" ref={dropdownRef}>
                    <S.DropdownItem className="DropdownItem">Профиль</S.DropdownItem>
                    <S.DropdownItem
                        className="DropdownItem"
                        onClick={() =>
                            navigate(
                                !isPersonalArea ? ROUTER.PERSONAL_AREA_PATH : ROUTER.MAIN_PAGE_PATH,
                            )
                        }
                    >
                        {!isPersonalArea ? 'Админка' : 'Вернуться в продукт'}{' '}
                        <Icon iconName={Icons.OpenInWindow} />
                    </S.DropdownItem>

                    <S.DividerStyled className="DividerStyled" type="horizontal" />

                    <S.DropdownItem className="DropdownItem" onClick={() => clearAuth()}>
                        Выход <Icon iconName={Icons.NavArrowRight} />
                    </S.DropdownItem>
                </S.Dropdown>
                // </S.BlurContainer>
            )}
        </>
    );
};
