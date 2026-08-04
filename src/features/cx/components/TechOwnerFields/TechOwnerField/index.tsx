import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { Text } from 'components/core';
import { Autocomplete } from 'components/ui';

import { useGetEmployee } from 'api/queries/profile';
import { useDebounce } from 'hooks';

import {
    defaultOwner,
    EmployeeOption,
    getSelectedOwnerOption,
    OwnerFieldsFormValues,
} from '../../utils';

import * as S from './units';

type TechOwnerFieldProps = {
    index: number;
    excludeEmployeeNumbers?: string[];
};

export const TechOwnerField = ({ index, excludeEmployeeNumbers = [] }: TechOwnerFieldProps) => {
    const [searchEmployee, setSearchEmployee] = useState('');
    const searchEmployeeDebounced = useDebounce(searchEmployee);

    const {
        control,
        formState: { errors },
    } = useFormContext<OwnerFieldsFormValues>();

    const fieldName = `techOwner.${index}` as const;

    const { data: employeeData, isLoading: isLoadingEmployee } =
        useGetEmployee(searchEmployeeDebounced);

    const employeeOptions: EmployeeOption[] = (employeeData ?? [])
        .map((employee) => ({
            id: employee.employeeNumber,
            value: employee.fullName,
            ownerId: employee.id,
            employeeNumber: employee.employeeNumber,
            login: employee.userName,
            fullname: employee.fullName,
            email: employee.email,
        }))
        .filter((option) => !excludeEmployeeNumbers.includes(option.employeeNumber));

    const fieldError = get(errors, `${fieldName}.employeeNumber`) as
        | { message?: string }
        | undefined;
    const errorMessage = fieldError?.message;

    return (
        <Controller
            name={fieldName}
            control={control}
            defaultValue={defaultOwner}
            render={({ field }) => (
                <Autocomplete
                    fullWidth
                    label="ФИО"
                    error={Boolean(fieldError)}
                    helperText={errorMessage}
                    options={employeeOptions}
                    loading={isLoadingEmployee}
                    loadingContent={
                        <S.LoadingContent>
                            <Text inactive variant="subtitle3">
                                Загрузка...
                            </Text>
                        </S.LoadingContent>
                    }
                    value={getSelectedOwnerOption(field.value, employeeOptions)}
                    onChange={(option) => {
                        const employee = option as EmployeeOption;

                        field.onChange({
                            id: employee.ownerId,
                            employeeNumber: employee.employeeNumber,
                            login: employee.login,
                            fullname: employee.fullname,
                            email: employee.email,
                        });
                    }}
                    onInputChange={(value) => {
                        setSearchEmployee(value);
                        field.onChange(defaultOwner);
                    }}
                    onInputClear={() => {
                        setSearchEmployee('');
                        field.onChange(defaultOwner);
                    }}
                    renderValue={(option) => option.value}
                    makeOption={(option) => (
                        <S.OptionContent>
                            <S.OptionText variant="body2">{option.value}</S.OptionText>
                            <S.OptionText inactive variant="body3">
                                {(option as EmployeeOption).email}
                            </S.OptionText>
                        </S.OptionContent>
                    )}
                    type="select"
                />
            )}
        />
    );
};
