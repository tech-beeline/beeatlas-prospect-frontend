import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { Text } from 'components/core';
import { Autocomplete } from 'components/ui';

import { useGetEmployee } from 'api/queries/profile';
import { useDebounce } from 'hooks';

import {
    defaultBusinessOwner,
    EmployeeOption,
    getSelectedOwnerOption,
    OwnerFieldsFormValues,
} from '../utils';

import * as S from './units';

export const BusinessOwnerField = () => {
    const [searchEmployee, setSearchEmployee] = useState('');
    const searchEmployeeDebounced = useDebounce(searchEmployee);

    const {
        control,
        formState: { errors },
    } = useFormContext<OwnerFieldsFormValues>();

    const { data: employeeData, isLoading: isLoadingEmployee } =
        useGetEmployee(searchEmployeeDebounced);

    const employeeOptions: EmployeeOption[] = (employeeData ?? []).map((employee) => ({
        id: employee.employeeNumber,
        value: employee.fullName,
        ownerId: employee.id,
        employeeNumber: employee.employeeNumber,
        login: employee.userName,
        fullname: employee.fullName,
        email: employee.email,
    }));

    const error = get(errors, 'businessOwner.employeeNumber') ?? get(errors, 'businessOwner');
    const errorMessage = error?.message ? String(error.message) : undefined;

    return (
        <Controller
            name="businessOwner"
            control={control}
            defaultValue={defaultBusinessOwner}
            render={({ field }) => (
                <Autocomplete
                    fullWidth
                    label="Владелец сценария*"
                    error={Boolean(error)}
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
                        field.onChange(defaultBusinessOwner);
                    }}
                    onInputClear={() => {
                        setSearchEmployee('');
                        field.onChange(defaultBusinessOwner);
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
