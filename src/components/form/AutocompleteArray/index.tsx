import React, { FC, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Text } from 'components/core';

import { isNotNull } from 'utils/helpers';

import { ArrayRow } from './components';
import { IAutocompleteArray } from './types';
import * as S from './units';

export const AutocompleteArray: FC<IAutocompleteArray> = ({
    title,
    name,
    options,
    disabled = false,
    label,
    isLoading = false,
    makeOption,
}) => {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    const values = watch(name);
    const selectedValuesIds = ((values as { value: number | null }[]) ?? [])
        .map((value: { value: number | null }) => value.value)
        .filter(isNotNull);

    useEffect(() => {
        if (fields.length === 0) {
            append({ value: null });
        }
    }, [fields, append]);

    const handleAdd = () => {
        append({ value: null });
    };

    const handleDelete = (rowIndex: number) => {
        if (rowIndex === 0) {
            return;
        }

        remove(rowIndex);
    };

    return (
        <S.Container>
            {title && <Text variant="subtitle1">{title}</Text>}
            <S.Rows>
                {fields.map((field, rowIndex) => (
                    <ArrayRow
                        key={field.id}
                        index={rowIndex}
                        onAddClick={handleAdd}
                        onDeleteClick={handleDelete}
                        name={name}
                        options={options}
                        isLoading={isLoading}
                        label={label}
                        disabled={disabled}
                        makeOption={makeOption}
                        selectedValueIds={selectedValuesIds}
                    />
                ))}
            </S.Rows>
        </S.Container>
    );
};
