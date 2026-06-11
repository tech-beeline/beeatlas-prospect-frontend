import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { defaultOwner, OwnerFieldsFormValues } from '../utils';

import { TechOwnerField } from './TechOwnerField';
import * as S from './units';

type TechOwnerFieldsProps = {
    smallButton?: boolean;
};

export const TechOwnerFields = ({ smallButton = false }: TechOwnerFieldsProps) => {
    const { control, watch } = useFormContext<OwnerFieldsFormValues>();
    const { fields, prepend, remove } = useFieldArray({
        control,
        name: 'techOwner',
    });

    const techOwners = watch('techOwner');

    useEffect(() => {
        if (fields.length === 0) {
            prepend(defaultOwner);
        }
    }, [fields, prepend]);

    const handleAdd = () => {
        prepend(defaultOwner);
    };

    const handleDelete = (rowIndex: number) => {
        if (fields.length === 1) {
            return;
        }

        remove(rowIndex);
    };

    const getExcludeEmployeeNumbers = (rowIndex: number) =>
        (techOwners ?? [])
            .filter((_, index) => index !== rowIndex)
            .map((owner) => owner.employeeNumber)
            .filter(Boolean);

    return (
        <S.Container>
            <S.Header>
                <Text variant="subtitle1">Технический ответственный</Text>

                {smallButton ? (
                    <IconButton
                        type="button"
                        variant="plain"
                        onClick={handleAdd}
                        iconName={Icons.Add}
                        size="large"
                    />
                ) : (
                    <Button type="button" size="medium" variant="outlined" onClick={handleAdd}>
                        Добавить
                    </Button>
                )}
            </S.Header>

            <S.Rows>
                {fields.map((field, rowIndex) => (
                    <S.Row key={field.id}>
                        <S.FieldContainer>
                            <TechOwnerField
                                index={rowIndex}
                                excludeEmployeeNumbers={getExcludeEmployeeNumbers(rowIndex)}
                            />
                        </S.FieldContainer>

                        {fields.length > 1 && (
                            <Button
                                type="button"
                                size="medium"
                                variant="outlined"
                                onClick={() => handleDelete(rowIndex)}
                                startIcon={<Icon iconName={Icons.Delete} />}
                            />
                        )}
                    </S.Row>
                ))}
            </S.Rows>
        </S.Container>
    );
};
