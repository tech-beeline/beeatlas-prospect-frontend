import React, { useEffect, useState } from 'react';
import { dataToFormValues, formValuesToData } from 'features/cx';
import { FormValues, validationSchema } from 'features/cx/components/BIForm/form';

import { useUpdateBIMutation } from 'api/queries/bi';
import { useGetBIChannelsQuery, useGetBIStatusesQuery } from 'api/queries/bi-library';
import { useSnackbarStore } from 'widgets/Snackbar';

import { RowIds } from '../../../../types';

import {
    CellEditType,
    EditStateValue,
    FORM_FIELD_BY_ROW_ID,
    formatValueForForm,
    getCellTypeByRowId,
    getFieldNameByRowId,
    IEditableCellProps,
    OnChangeOption,
} from './types';
import * as S from './units';

export const EditableCell = ({
    rowId,
    element,
    isActive,
    formatData,
    onEndEdit,
}: IEditableCellProps) => {
    const { mutateAsync: updateBi } = useUpdateBIMutation();
    const { data: channels } = useGetBIChannelsQuery();
    const { data: statuses } = useGetBIStatusesQuery();

    const cellType = getCellTypeByRowId(rowId);

    const [value, setValue] = useState<EditStateValue>('');
    const [initialValue, setInitialValue] = useState<EditStateValue>('');
    const [hasError, setHasError] = useState(false);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    useEffect(() => {
        if (!isActive || !element) return;

        let val: EditStateValue = '';

        switch (rowId) {
            case RowIds.STATUS:
                val = element.status?.id ?? '';
                break;
            case RowIds.TYPE:
                val = element.target === true ? 0 : 1;
                break;
            case RowIds.CHANNEL:
                val = element.channel?.map((ch) => ch.id) ?? [];
                break;
            default:
                val = (element[getFieldNameByRowId(rowId)] as string) ?? '';
        }

        setValue(val);
        setInitialValue(val);
    }, [isActive, element, rowId]);

    useEffect(() => {
        if (!isActive && initialValue !== '') {
            setValue(initialValue);
        }
    }, [isActive, initialValue]);

    const statusOptions = statuses?.map((s) => ({ id: s.id, name: s.name })) ?? [];
    const channelOptions = channels?.map((c) => ({ id: c.id, name: c.name })) ?? [];
    const typeOptions = [
        { id: 0, name: 'Целевой' },
        { id: 1, name: 'Фактический' },
    ];

    const optionMap: Partial<Record<RowIds, Array<{ id: number; name: string }>>> = {
        [RowIds.STATUS]: statusOptions,
        [RowIds.TYPE]: typeOptions,
        [RowIds.CHANNEL]: channelOptions,
    };

    const getSelectValues = (rowId: RowIds, value: unknown, multiple: boolean) => {
        const options = optionMap[rowId] || [];

        if (multiple) {
            const valueArray = (Array.isArray(value) ? value : []) as number[];
            return options
                .filter((opt) => valueArray.includes(opt.id))
                .map((opt) => ({
                    id: String(opt.id),
                    value: opt.name,
                }));
        } else {
            if (value == null || value === '') return [];
            const id = Number(value);
            const option = options.find((opt) => opt.id === id);
            return option ? [{ id: String(option.id), value: option.name }] : [];
        }
    };

    const sendUpdate = async (newValue: EditStateValue) => {
        const formKey = FORM_FIELD_BY_ROW_ID[rowId];
        if (!formKey) {
            return;
        }

        if (formKey === 'name') {
            try {
                await validationSchema.validateAt('name', {
                    name: newValue,
                });
                setHasError(false);
            } catch (err: any) {
                setHasError(true);
                showSnackbar({
                    message: 'Заполните название',
                });
                return;
            }
        }
        const currentFormValues = dataToFormValues(element);
        const updatedFormValues: FormValues = { ...currentFormValues };
        (updatedFormValues[formKey] as FormValues[typeof formKey]) = formatValueForForm(
            rowId,
            newValue,
        );

        const dataToUpdate = formValuesToData(updatedFormValues);

        await updateBi({
            id: String(element.id),
            data: {
                ...dataToUpdate,
                draft: element.draft,
            },
        });

        onEndEdit?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            sendUpdate(value);
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            setValue(initialValue);
            onEndEdit?.();
        }
    };

    const handleBlur = () => {
        setHasError(false);
        setValue(initialValue);
        onEndEdit?.();
    };

    if (!isActive) {
        return <>{formatData}</>;
    }

    const inputElement =
        cellType === CellEditType.TEXT ? (
            <S.InputStyled
                autoFocus
                value={value as string}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                hasError={hasError}
            />
        ) : null;

    const textAreaElement =
        cellType === CellEditType.TEXTAREA ? (
            <S.TextAreaStyled
                autoFocus
                value={value as string}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
            />
        ) : null;

    const selectElement =
        cellType === CellEditType.SELECT ? (
            <S.SelectStyled
                key={`select-${String(rowId)}-${String(element.id)}-${
                    isActive ? 'active' : 'inactive'
                }`}
                autoFocus
                fullWidth
                multiple={false}
                open={isActive}
                options={(optionMap[rowId] ?? []).map((opt) => ({
                    id: String(opt.id),
                    value: opt.name,
                }))}
                values={getSelectValues(rowId, value, false)}
                onChange={(selectedOptions) => {
                    const opts = selectedOptions as OnChangeOption[];
                    const id = opts.length > 0 ? opts[0].id : '';
                    const numId = id === '' ? '' : Number(id);
                    sendUpdate(numId);
                }}
                onBlur={handleBlur}
                size="large"
            />
        ) : null;

    const multiSelectElement =
        cellType === CellEditType.MULTISELECT && rowId === RowIds.CHANNEL ? (
            <S.SelectStyled
                key={`multiselect-${String(rowId)}-${String(element.id)}-${
                    isActive ? 'active' : 'inactive'
                }`}
                autoFocus
                multiple
                fullWidth
                open={isActive}
                options={
                    optionMap[RowIds.CHANNEL]?.map((opt) => ({
                        id: String(opt.id),
                        value: opt.name,
                    })) || []
                }
                values={getSelectValues(RowIds.CHANNEL, value, true)}
                onChange={(selectedOptions) => {
                    const ids = (selectedOptions as OnChangeOption[]).map((opt) => Number(opt.id));
                    setValue(ids);
                }}
                onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
                    const related = e.relatedTarget as HTMLElement | null;
                    if (related && e.currentTarget.contains(related)) return;

                    setValue(initialValue);
                    onEndEdit?.();
                }}
                size="large"
            />
        ) : null;

    return (
        <div tabIndex={-1} onKeyDown={handleKeyDown} style={{ width: '100%' }}>
            {inputElement}
            {textAreaElement}
            {selectElement}
            {multiSelectElement}
        </div>
    );
};
