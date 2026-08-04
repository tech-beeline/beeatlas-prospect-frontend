import React, { useRef } from 'react';

import { Text } from 'components/core';
import { Search } from 'components/ui';

import { useModal } from 'hooks';

import { IAutocompleteControlled } from './types';
import * as S from './units';
import { getHighlightedText } from './utils';

export const MenuItem = <T extends { id: number; value: string }>({
    searchText,
    option,
    onChange,
}: {
    searchText: string;
    option: T;
    onChange: (option: any) => void;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const text = getHighlightedText(option.value, searchText);

    return (
        <S.MenuItem
            ref={ref}
            key={option.id}
            onMouseDown={() => {
                onChange(option);
            }}
        >
            <Text variant="body2">{text}</Text>
        </S.MenuItem>
    );
};

export const AutocompleteControlled = <T extends { id: number; value: string }>({
    searchText,
    setSearchText,
    placeholder,
    options,
    onChange,
    onClear,
}: IAutocompleteControlled<T>) => {
    const { openModal, closeModal, modalOpened } = useModal();
    return (
        <S.Container>
            <Search
                fullWidth
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={placeholder}
                onClear={onClear}
                onFocus={openModal}
                onBlur={closeModal}
            />
            {modalOpened && (
                <S.Menu>
                    {options.map((o) => (
                        <MenuItem
                            key={o.id}
                            searchText={searchText}
                            option={o}
                            onChange={onChange}
                        ></MenuItem>
                    ))}
                </S.Menu>
            )}
        </S.Container>
    );
};
