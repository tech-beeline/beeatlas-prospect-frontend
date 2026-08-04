import React, { FC, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { TextField } from 'components/ui';

import { CapabilitySearchVariant } from 'api/capability/types';
import { useGetCapabilitiesQuery } from 'api/queries/capability';
import { useDebounce } from 'hooks';

import { ICapabilityAutocomplete } from './types';
import * as S from './units';

export const CapabilityAutocomplete: FC<ICapabilityAutocomplete> = ({
    isLoadingCapability,
    parent,
}) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText);

    useEffect(() => {
        if (parent) setSearchText(parent.name);
    }, [parent]);

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = get(errors, 'domain');
    const errorMessage = error?.message ? String(error.message) : undefined;
    const isError = Boolean(error);

    const { data, isLoading } = useGetCapabilitiesQuery({
        search: debouncedSearchText,
        searchVariant: CapabilitySearchVariant.BUSINESS_CAPABILITY,
    });

    const parentOptions = (data ?? []).map((capability) => ({
        value: capability.name,
        id: capability.id,
    }));

    return (
        <Controller
            name="domain"
            control={control}
            render={({ field }) => (
                <S.Container>
                    <TextField
                        fullWidth
                        label="Родительская возможность (домен или бизнес-возможность)"
                        value={searchText}
                        error={isError}
                        helperText={errorMessage}
                        helperPosition={errorMessage ? 'block' : 'absolute'}
                        onChange={(e) => setSearchText(e.target.value)}
                        onFocus={() => setMenuOpened(true)}
                        onBlur={() => setMenuOpened(false)}
                        disabled={isLoadingCapability}
                    />
                    {menuOpened && (
                        <S.MenuBlock>
                            {isLoading && <S.MenuItem inActive>Загрузка...</S.MenuItem>}
                            {parentOptions.length === 0 && !isLoading && (
                                <S.MenuItem inActive>
                                    {debouncedSearchText === ''
                                        ? 'Начните вводить название родительской возможности'
                                        : 'Нет совпадений'}
                                </S.MenuItem>
                            )}
                            {parentOptions.map((item, i) => (
                                <S.MenuItem
                                    key={i}
                                    onMouseDown={() => {
                                        field.onChange(item.id);
                                        setSearchText(item.value);
                                    }}
                                >
                                    {item.value}
                                </S.MenuItem>
                            ))}
                        </S.MenuBlock>
                    )}
                </S.Container>
            )}
        />
    );
};
