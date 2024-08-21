import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOutsideClick } from 'hooks/useOutsideClick';
import * as ROUTER from 'router/const';

import { IProfileIcon } from './types';
import * as S from './units';

export const ProfileIcon: FC<IProfileIcon> = ({ initials }) => {
    const [isShowDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const profileIconRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown, profileIconRef);

    const handleSubscriptionsClick = () => {
        navigate(`${ROUTER.PROFILE_PATH}${ROUTER.INFO_PATH}`);
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
                </S.Dropdown>
            )}
        </>
    );
};
