import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { MultiSelect, Select, TextArea, TextField } from 'components/form';

import { useGetBIChannelsQuery, useGetBIStatusesQuery } from 'api/queries/bi-library';

import { RowIds } from '../../../../types';

import { CellEditType, getCellTypeByRowId, getFieldNameByRowId, IEditableCellProps } from './types';

export const EditableCell = <T,>({
    rowId,
    formatData,
    element,
    isEditing,
    onEndEdit,
}: IEditableCellProps<T>) => {
    const { data: channel } = useGetBIChannelsQuery();
    const { data: statuses } = useGetBIStatusesQuery();

    const channelOptions = (channel ?? []).map((channel) => ({
        id: channel.id,
        value: channel.name,
    }));
    const statusOptions = (statuses ?? []).map((status) => ({
        id: status.id,
        value: status.name,
    }));
    const typeOptions = [
        { id: 0, value: 'Целевой' },
        { id: 1, value: 'Фактический' },
    ];

    let selectOptions: Array<{ id: number; value: string }> = [];

    switch (rowId) {
        case RowIds.STATUS:
            selectOptions = statusOptions;

            break;
        case RowIds.TYPE:
            selectOptions = typeOptions;
            break;
        default:
            break;
    }

    const typeCell = getCellTypeByRowId(rowId);
    const { setValue } = useFormContext();
    const fieldName = getFieldNameByRowId(rowId);
    useEffect(() => {
        if (!isEditing || !element) return;

        const value = element?.[fieldName];

        if (typeCell === CellEditType.MULTISELECT && Array.isArray(value)) {
            setValue(
                fieldName,
                value.map((v: any) => v.id ?? v),
            );
        } else {
            setValue(fieldName, value ?? '');
        }
    }, [isEditing, fieldName, element, setValue]);

    if (!isEditing) {
        return <div>{formatData}</div>;
    }
    const handleBlur = () => {
        if (element) {
            const originalValue = element[fieldName];
            if (typeCell === CellEditType.MULTISELECT && Array.isArray(originalValue)) {
                setValue(
                    fieldName,
                    originalValue.map((v: any) => v.id ?? v),
                );
            } else {
                setValue(fieldName, originalValue ?? '');
            }
        }
        onEndEdit?.();
    };
    return (
        <>
            {typeCell === CellEditType.TEXT && (
                <TextField name={fieldName} label="" autoFocus onBlur={handleBlur} />
            )}

            {typeCell === CellEditType.TEXTAREA && (
                <TextArea
                    fullWidth
                    name={fieldName}
                    helperPosition="absolute"
                    label=""
                    autoFocus
                    onBlur={handleBlur}
                />
            )}

            {typeCell === CellEditType.SELECT && (
                <Select
                    name={fieldName}
                    label=""
                    options={selectOptions}
                    autoFocus
                    onBlur={handleBlur}
                />
            )}

            {typeCell === CellEditType.MULTISELECT && (
                <MultiSelect
                    name={fieldName}
                    label=""
                    fullWidth
                    options={channelOptions}
                    autoFocus
                    onBlur={handleBlur}
                />
            )}
        </>
    );
};
