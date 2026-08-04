import React, { FC, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
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
    useExternalAddButton = false,
    smallButton = false,
    titleVariant = 'subtitle1',
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
        if (useExternalAddButton && fields.length === 1) {
            return;
        }

        if (!useExternalAddButton && rowIndex === 0) {
            return;
        }

        remove(rowIndex);
    };

    return (
        <S.Container>
            {(title || useExternalAddButton) && (
                <S.Header>
                    {title && <Text variant={titleVariant}>{title}</Text>}

                    {useExternalAddButton &&
                        (smallButton ? (
                            <IconButton
                                type="button"
                                variant="plain"
                                onClick={handleAdd}
                                disabled={disabled}
                                iconName={Icons.Add}
                                size="large"
                            />
                        ) : (
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleAdd}
                                disabled={disabled}
                            >
                                Добавить
                            </Button>
                        ))}
                </S.Header>
            )}
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
                        customActions={useExternalAddButton}
                        showAddButton={false}
                        canDelete={useExternalAddButton ? fields.length > 1 : rowIndex !== 0}
                    />
                ))}
            </S.Rows>
        </S.Container>
    );
};
