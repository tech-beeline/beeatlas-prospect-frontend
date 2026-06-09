import React, { FC, useRef, useState } from 'react';

import { Button, Icon } from 'components/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { SortingVariant } from '../../const';

import { ISortingButton } from './types';
import * as S from './units';

export const SortingButton: FC<ISortingButton> = ({ sortingVariant, setSortingVariant }) => {
    const [isShowDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);

    const buttonRef = useRef<HTMLButtonElement>(null);

    useOutsideClick(dropdownRef, isShowDropdown, setShowDropdown, buttonRef);

    const handleItemClick = (sortingVariant: SortingVariant) => {
        setSortingVariant(sortingVariant);
        setShowDropdown(false);
    };

    return (
        <S.Wrapper>
            <Button
                startIcon={<Icon iconName={Icons.DataTransferBoth} />}
                size="small"
                onClick={() => setShowDropdown(!isShowDropdown)}
                ref={buttonRef}
            />

            {isShowDropdown && (
                <S.Dropdown ref={dropdownRef}>
                    <S.DropdownItem onClick={() => handleItemClick(SortingVariant.DESC)}>
                        Сначала новые
                        {sortingVariant === SortingVariant.DESC && (
                            <Icon iconName={Icons.Check} size="large" />
                        )}
                    </S.DropdownItem>
                    <S.DropdownItem onClick={() => handleItemClick(SortingVariant.ASC)}>
                        Сначала старые
                        {sortingVariant === SortingVariant.ASC && (
                            <Icon iconName={Icons.Check} size="large" />
                        )}
                    </S.DropdownItem>
                </S.Dropdown>
            )}
        </S.Wrapper>
    );
};
