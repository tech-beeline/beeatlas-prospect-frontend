import React, { FC, useState } from 'react';

import { Autocomplete } from 'components/form';
import { Button, Icon } from 'components/ui';

import { CapabilitySearchVariant } from 'api/capability/types';
import { useGetCapabilitiesQuery } from 'api/queries/capability';
import { useDebounce } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IBCField } from './types';
import * as S from './units';

export const BCField: FC<IBCField> = ({ index, disabled, append, remove }) => {
    const [bcSearchText, setBCSearchText] = useState('');
    const debouncedSearchText = useDebounce(bcSearchText);

    const { data, isLoading } = useGetCapabilitiesQuery({
        search: debouncedSearchText,
        searchVariant: CapabilitySearchVariant.BUSINESS_CAPABILITY,
    });

    const parentOptions = (data ?? []).map((capability) => ({
        value: capability.name,
        id: capability.id,
    }));

    const handleAddButtonClick = () => {
        append({} as unknown as { id: number });
    };

    return (
        <S.FlexContainer>
            <S.FullWidthContainer>
                <Autocomplete
                    fullWidth
                    name={`bc.${index}.id`}
                    loading={isLoading}
                    disabled={disabled}
                    loadingText="Загрузка..."
                    noOptionsText={
                        debouncedSearchText === ''
                            ? 'Начните вводить название бизнес-возможности'
                            : 'Нет совпадений'
                    }
                    label="Бизнес-возможность*"
                    options={parentOptions}
                    onInputChange={setBCSearchText}
                />
            </S.FullWidthContainer>
            {index === 0 && (
                <Button
                    type="button"
                    disabled={disabled}
                    startIcon={<Icon iconName={Icons.Add} />}
                    size="medium"
                    onClick={handleAddButtonClick}
                />
            )}
            {index !== 0 && (
                <Button
                    type="button"
                    disabled={disabled}
                    startIcon={<Icon iconName={Icons.Delete} />}
                    size="medium"
                    onClick={() => remove(index)}
                />
            )}
        </S.FlexContainer>
    );
};
