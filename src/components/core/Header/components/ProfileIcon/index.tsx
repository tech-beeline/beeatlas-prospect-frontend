import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthProvider } from 'features/auth';

import { Icon } from 'components/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IProfileIcon } from './types';
import * as S from './units';

export const ProfileIcon: FC<IProfileIcon> = ({ initials, isAdminPanel, isAdmin }) => {
    const [isShowDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const profileIconRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown, profileIconRef);

    const handleSubscriptionsClick = () => {
        navigate(`${R.PROFILE_PATH}${R.SUBSCRIPTIONS_PATH}`);
        setShowDropdown(false);
    };

    const navigateToAdminPanel = () => {
        navigate(isAdminPanel ? R.MAIN_PAGE_PATH : `${R.ADMIN_PATH}${R.USERS_PATH}`);
        setShowDropdown(false);
    };

    return (
        <>
            <S.Wrapper onClick={() => setShowDropdown(!isShowDropdown)} ref={profileIconRef}>
                {initials}
            </S.Wrapper>

            {isShowDropdown && (
                <S.Dropdown className="Dropdown" ref={dropdownRef}>
                    <S.DropdownItem onClick={handleSubscriptionsClick} className="DropdownItem">
                        Профиль
                    </S.DropdownItem>
                    {isAdmin && (
                        <S.DropdownItem onClick={navigateToAdminPanel} className="DropdownItem">
                            {isAdminPanel ? 'Вернуться в приложение' : 'Консоль администратора'}
                            <Icon iconName={Icons.OpenInWindow} size="large" />
                        </S.DropdownItem>
                    )}
                    {getAuthProvider().supportsSignout && (
                        <S.DropdownItem
                            onClick={() => getAuthProvider().signout?.()}
                            className="DropdownItem"
                        >
                            Выйти
                            <Icon iconName={Icons.LogOut} size="large" />
                        </S.DropdownItem>
                    )}
                </S.Dropdown>
            )}
        </>
    );
};
