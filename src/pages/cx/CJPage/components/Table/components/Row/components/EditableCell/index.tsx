import React, { useEffect, useState } from 'react';
import { Select } from '@beeline/design-system-react';

import { useUpdateBIMutation } from 'api/queries/bi';
import { useGetBIChannelsQuery, useGetBIStatusesQuery } from 'api/queries/bi-library';

import { RowIds } from '../../../../types';

import { CellEditType, getCellTypeByRowId, getFieldNameByRowId, IEditableCellProps } from './types';
import * as S from './units';

export const EditableCell = <T,>({
    rowId,
    element,
    isEditing,
    formatData,
    onEndEdit,
}: IEditableCellProps<T>) => {
    const { mutateAsync: updateBi } = useUpdateBIMutation();

    const { data: channels } = useGetBIChannelsQuery();
    const { data: statuses } = useGetBIStatusesQuery();

    const fieldName = getFieldNameByRowId(rowId);
    const cellType = getCellTypeByRowId(rowId);

    const [value, setValue] = useState<any>('');

    useEffect(() => {
        if (!isEditing || !element) return;

        const raw = element[fieldName];

        switch (cellType) {
            case CellEditType.MULTISELECT:
                // @ts-ignore
                setValue(Array.isArray(raw) ? raw.map((item) => item.id ?? item) : []);
                break;

            case CellEditType.SELECT:
                if (rowId === RowIds.TYPE) {
                    const id = raw === true ? 0 : 1;
                    setValue(id);
                } else {
                    // @ts-ignore
                    setValue(raw?.id ?? raw ?? '');
                }
                break;

            default:
                setValue(raw ?? '');
        }
    }, [isEditing, element, fieldName, cellType]);

    const statusOptions = statuses?.map((s) => ({ id: s.id, value: s.name })) ?? [];
    const channelOptions = channels?.map((c) => ({ id: c.id, value: c.name })) ?? [];
    const typeOptions = [
        { id: 0, value: 'Целевой' },
        { id: 1, value: 'Фактический' },
    ];

    const selectOptions =
        rowId === RowIds.STATUS ? statusOptions : rowId === RowIds.TYPE ? typeOptions : [];

    const multiSelectOptions = rowId === RowIds.CHANNEL ? channelOptions : [];

    const sendUpdate = async (newValue: any) => {
        let formatted = newValue;

        if (cellType === CellEditType.SELECT) {
            if (rowId === RowIds.TYPE) {
                formatted = Number(newValue) === 0;
            } else {
                formatted = { id: Number(newValue) };
            }
        }

        if (cellType === CellEditType.MULTISELECT) {
            formatted = newValue.map((id: number) => ({ id }));
        }

        await updateBi({
            id: String(element.id),
            // @ts-ignore
            data: {
                [fieldName]: formatted,
            },
        });

        onEndEdit?.();
    };

    if (!isEditing) {
        return <div>{formatData}</div>;
    }

    return (
        <div key={rowId}>
            {cellType === CellEditType.TEXT && (
                <S.InputStyled
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => sendUpdate(value)}
                />
            )}

            {cellType === CellEditType.TEXTAREA && (
                <S.TextAreaStyled
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => sendUpdate(value)}
                />
            )}

            {cellType === CellEditType.SELECT && (
                <S.SelectStyled
                    autoFocus
                    value={String(value)}
                    onChange={(e) => {
                        const val = e.target.value === '' ? '' : Number(e.target.value);

                        setValue(val);
                    }}
                    onBlur={() => sendUpdate(value)}
                >
                    {selectOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.value}
                        </option>
                    ))}
                </S.SelectStyled>
            )}

            {cellType === CellEditType.MULTISELECT && (
                <Select
                    multiple
                    fullWidth
                    options={multiSelectOptions.map((opt) => ({
                        id: String(opt.id),
                        value: opt.value,
                    }))}
                    values={multiSelectOptions
                        .filter((opt) => value.includes(opt.id))
                        .map((opt) => ({
                            id: String(opt.id),
                            value: opt.value,
                        }))}
                    onChange={(selectedOptions) => {
                        if (!selectedOptions) {
                            const empty: number[] = [];
                            setValue(empty);
                            sendUpdate(empty);
                            return;
                        }

                        const newValue = selectedOptions.map((opt) => Number(opt.id));
                        setValue(newValue);
                        sendUpdate(newValue);
                    }}
                    size="medium"
                    onBlur={() => sendUpdate(value)}
                />
            )}
        </div>
    );
};
