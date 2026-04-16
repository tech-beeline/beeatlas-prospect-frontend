import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Icon, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Autocomplete } from 'components/form';

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
    const { watch } = useFormContext();
    const fieldValues = watch(name);

    const [rowsCount, setRowsCount] = useState(1);
    const [searchValues, setSearchValues] = useState<string[]>(['']);

    useEffect(() => {
        const valuesCount = fieldValues?.length ?? 0;
        const nextRowsCount = Math.max(valuesCount, 1);

        setRowsCount(nextRowsCount);
        setSearchValues((prev) => {
            if (prev.length === nextRowsCount) {
                return prev;
            }

            if (prev.length > nextRowsCount) {
                return prev.slice(0, nextRowsCount);
            }

            return [...prev, ...Array.from({ length: nextRowsCount - prev.length }, () => '')];
        });
    }, [fieldValues]);

    const handleAdd = () => {
        setRowsCount((prev) => prev + 1);
        setSearchValues((prev) => [...prev, '']);
    };

    const handleDelete = (rowIndex: number) => {
        if (rowIndex === 0) {
            return;
        }

        setRowsCount((prev) => Math.max(prev - 1, 1));
        setSearchValues((prev) => prev.filter((_, index) => index !== rowIndex));
    };

    return (
        <S.Container>
            {title && <Text variant="subtitle1">{title}</Text>}
            <S.Rows>
                {Array.from({ length: rowsCount }).map((_, rowIndex) => {
                    const rowSearchValue = searchValues[rowIndex] ?? '';
                    const filteredOptions = options.filter((option) =>
                        option.value.toLowerCase().includes(rowSearchValue.toLowerCase()),
                    );

                    return (
                        <S.Row key={`${name}-${rowIndex}`}>
                            {isLoading ? (
                                <Skeleton height={50} radius={12} />
                            ) : (
                                <>
                                    <S.SelectContainer>
                                        <Autocomplete
                                            fullWidth
                                            name={`${name}.${rowIndex}`}
                                            label={label}
                                            options={filteredOptions}
                                            disabled={disabled}
                                            onInputChange={(value) =>
                                                setSearchValues((prev) =>
                                                    prev.map((item, index) =>
                                                        index === rowIndex ? value : item,
                                                    ),
                                                )
                                            }
                                            makeOption={makeOption}
                                        />
                                    </S.SelectContainer>
                                    {rowIndex === 0 ? (
                                        <Button
                                            type="button"
                                            size="medium"
                                            variant="outlined"
                                            onClick={handleAdd}
                                            startIcon={<Icon iconName={Icons.Add} />}
                                            disabled={disabled}
                                        />
                                    ) : (
                                        <Button
                                            type="button"
                                            size="medium"
                                            variant="outlined"
                                            onClick={() => handleDelete(rowIndex)}
                                            startIcon={<Icon iconName={Icons.Delete} />}
                                            disabled={disabled}
                                        />
                                    )}
                                </>
                            )}
                        </S.Row>
                    );
                })}
            </S.Rows>
        </S.Container>
    );
};
