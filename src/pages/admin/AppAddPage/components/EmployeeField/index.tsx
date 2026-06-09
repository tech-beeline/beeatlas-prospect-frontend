import React, { FC, useState } from 'react';

import { Autocomplete } from 'components/form';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IEmployeeField } from './types';
import * as S from './units';

export const EmployeeField: FC<IEmployeeField> = ({
    index,
    usersData,
    disabled,
    append,
    remove,
}) => {
    const [searchText, setSearchText] = useState('');

    const employeeOptions = (usersData ?? [])
        .filter((p) => p.full_name.toLowerCase().includes(searchText.toLowerCase()))
        .map((p) => ({
            id: p.id,
            value: p.full_name,
        }));

    return (
        <S.FormRow>
            <S.GrowContainer>
                <Autocomplete
                    fullWidth
                    disabled={disabled}
                    name={`employees.${index}.employee`}
                    label="Сотрудник"
                    options={employeeOptions}
                    onInputChange={(v) => setSearchText(v)}
                />
            </S.GrowContainer>
            {index === 0 ? (
                <S.ButtonContainer>
                    <Button
                        type="button"
                        size="medium"
                        onClick={() => append({ employee: undefined })}
                        startIcon={<Icon iconName={Icons.Add} />}
                    />
                </S.ButtonContainer>
            ) : (
                <S.ButtonContainer>
                    <Button
                        type="button"
                        size="medium"
                        onClick={() => remove(index)}
                        startIcon={<Icon iconName={Icons.Delete} />}
                    />
                </S.ButtonContainer>
            )}
        </S.FormRow>
    );
};
