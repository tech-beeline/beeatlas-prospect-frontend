import React, { FC, useRef, useState } from 'react';

import { Button, Icon, Radio } from 'components/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { SortingVariants } from '../../const';

import { ISortingButton } from './types';
import * as S from './units';

export const SortingButton: FC<ISortingButton> = ({ sortingVariant, setSortingVariant }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    const buttonRef = useRef<HTMLButtonElement>(null);

    useOutsideClick(dropdownRef, isOpen, setIsOpen, buttonRef);

    const handleRadioClick = (variant: SortingVariants) => {
        setSortingVariant(variant);
        setIsOpen(false);
    };

    return (
        <>
            <S.Container>
                <Button
                    ref={buttonRef}
                    variant="outlined"
                    startIcon={
                        <Icon
                            iconName={
                                sortingVariant === SortingVariants.LATEST
                                    ? Icons.SortDown
                                    : Icons.SortUp
                            }
                        />
                    }
                    onClick={() => setIsOpen(true)}
                >
                    Сортировка
                </Button>
                {isOpen && (
                    <S.Dropdown ref={dropdownRef}>
                        <S.DropdownItem>
                            <Radio
                                checked={sortingVariant === SortingVariants.LATEST}
                                label="От новых к старым"
                                onClick={() => handleRadioClick(SortingVariants.LATEST)}
                            />
                        </S.DropdownItem>
                        <S.DropdownItem>
                            <Radio
                                checked={sortingVariant === SortingVariants.OLDEST}
                                label="От старых к новым"
                                onClick={() => handleRadioClick(SortingVariants.OLDEST)}
                            />
                        </S.DropdownItem>
                    </S.Dropdown>
                )}
            </S.Container>
        </>
    );
};
