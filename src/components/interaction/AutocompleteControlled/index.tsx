import React, { ReactNode, useRef } from 'react';

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
    renderOption,
}: {
    searchText: string;
    option: T;
    onChange: (option: T) => void;
    renderOption?: (option: T) => ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const text = getHighlightedText(option.value, searchText);

    return (
        <S.MenuItem
            customContent={!!renderOption}
            ref={ref}
            key={option.id}
            onMouseDown={() => {
                onChange(option);
            }}
        >
            {renderOption ? renderOption(option) : <Text variant="body2">{text}</Text>}
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
    emptyText,
    renderOption,
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
                    <S.Scrollable>
                        {options.length === 0 && emptyText && (
                            <S.EmptyState>
                                <Text variant="body2" inactive>
                                    {emptyText}
                                </Text>
                            </S.EmptyState>
                        )}
                        {options.map((o) => (
                            <MenuItem
                                key={o.id}
                                searchText={searchText}
                                option={o}
                                onChange={onChange}
                                renderOption={renderOption}
                            ></MenuItem>
                        ))}
                    </S.Scrollable>
                </S.Menu>
            )}
        </S.Container>
    );
};
