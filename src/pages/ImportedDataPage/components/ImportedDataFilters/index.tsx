import React, { FC } from 'react';
import { Button, DatePickerRange, Select } from '@beeline/design-system-react';

import { StatusVariants } from './const';
import { IImportedDataFilters } from './types';
import * as S from './units';

export const ImportedDataFilters: FC<IImportedDataFilters> = ({
    filterOptions,
    setFilterOptions,
}) => {
    const statusOptions = [
        { id: StatusVariants.ALL, value: 'Все' },
        { id: StatusVariants.SUCCESS, value: 'Успешно' },
        { id: StatusVariants.ERROR, value: 'С ошибкой' },
        { id: StatusVariants.PROBLEM, value: 'Проблемные' },
        { id: StatusVariants.PROCESSED, value: 'В обработке' },
    ];

    const handleResetButtonClick = () => {
        setFilterOptions({ status: StatusVariants.ALL, dates: [] });
    };

    return (
        <S.FiltersContainer>
            <Select
                fullWidth
                label="Статусы"
                options={statusOptions}
                values={
                    filterOptions.status
                        ? [statusOptions.find((option) => option.id === filterOptions.status)!]
                        : []
                }
                onChange={(values) => {
                    setFilterOptions({ ...filterOptions, status: values[0].id });
                }}
            />
            <DatePickerRange
                label="Дата"
                value={filterOptions.dates}
                onChange={(values) =>
                    setFilterOptions({ ...filterOptions, dates: values as string[] })
                }
                maxDate={new Date().toISOString()}
            />
            <Button
                variant="plain"
                onClick={handleResetButtonClick}
                disabled={
                    filterOptions.status === StatusVariants.ALL && filterOptions.dates.length === 0
                }
            >
                Сбросить все
            </Button>
        </S.FiltersContainer>
    );
};
