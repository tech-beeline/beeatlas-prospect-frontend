import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Autocomplete } from 'components/form';
import { Button, Icon, Skeleton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IArrayRow } from './types';
import * as S from './units';

export const ArrayRow: FC<IArrayRow> = ({
    isLoading,
    name,
    options,
    label,
    disabled,
    makeOption,
    onAddClick,
    onDeleteClick,
    index,
    selectedValueIds,
    customActions = false,
    showAddButton = false,
    canDelete = false,
}) => {
    const { watch } = useFormContext();
    const value = watch(`${name}.${index}.value`);

    const [searchValue, setSearchValue] = useState('');

    const filteredOptions = options
        .filter((option) => option.value.toLowerCase().includes(searchValue.toLowerCase()))
        .filter((option) => option.id === value || !selectedValueIds.includes(option.id));

    return (
        <S.Row>
            {isLoading ? (
                <Skeleton height={50} radius={12} />
            ) : (
                <>
                    <S.SelectContainer>
                        <Autocomplete
                            fullWidth
                            name={`${name}.${index}.value`}
                            label={label}
                            options={filteredOptions}
                            disabled={disabled}
                            onInputChange={(value) => setSearchValue(value)}
                            makeOption={makeOption}
                        />
                    </S.SelectContainer>
                    {customActions ? (
                        <>
                            {showAddButton && (
                                <Button
                                    type="button"
                                    size="medium"
                                    variant="outlined"
                                    onClick={onAddClick}
                                    startIcon={<Icon iconName={Icons.Add} />}
                                    disabled={disabled}
                                />
                            )}

                            {canDelete && (
                                <Button
                                    type="button"
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => onDeleteClick(index)}
                                    startIcon={<Icon iconName={Icons.Delete} />}
                                    disabled={disabled}
                                />
                            )}
                        </>
                    ) : index === 0 ? (
                        <Button
                            type="button"
                            size="medium"
                            variant="outlined"
                            onClick={onAddClick}
                            startIcon={<Icon iconName={Icons.Add} />}
                            disabled={disabled}
                        />
                    ) : (
                        <Button
                            type="button"
                            size="medium"
                            variant="outlined"
                            onClick={() => onDeleteClick(index)}
                            startIcon={<Icon iconName={Icons.Delete} />}
                            disabled={disabled}
                        />
                    )}
                </>
            )}
        </S.Row>
    );
};
