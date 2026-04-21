import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Autocomplete } from 'components/form';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IEmployeeField } from './types';
import * as S from './units';

export const EmployeeField: FC<IEmployeeField> = ({
    index,
    usersData,
    disabled,
    length,
    remove,
    isOwner,
}) => {
    const [searchText, setSearchText] = useState('');

    const employeeOptions = (usersData ?? [])
        .filter((p) => p.full_name.toLowerCase().includes(searchText.toLowerCase()))
        .map((p) => ({
            id: p.id,
            value: p.full_name,
            email: p.email,
        }));

    return (
        <S.FormRow isFirst={index === 0}>
            <S.GrowContainer>
                <S.AutocompleteContainer>
                    <Autocomplete
                        fullWidth
                        disabled={disabled}
                        name={`employees.${index}.employee`}
                        label="ФИО"
                        options={employeeOptions}
                        onInputChange={(v) => setSearchText(v)}
                        noOptionsText="Нет совпадений"
                        makeOption={(option) => (
                            <div>
                                <Text variant="body2">{option.value}</Text>
                                <Text inactive variant="body3">
                                    {option.email}
                                </Text>
                            </div>
                        )}
                    />
                </S.AutocompleteContainer>
                {length > 1 && (
                    <Button
                        size="medium"
                        disabled={isOwner}
                        variant="outlined"
                        type="button"
                        onClick={() => remove(index)}
                        startIcon={<Icon iconName={Icons.Delete} />}
                    />
                )}
            </S.GrowContainer>
        </S.FormRow>
    );
};
