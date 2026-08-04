import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { Autocomplete, TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Button } from 'components/ui';

import {
    useCreatePatternGroupMutation,
    useGetPatternGroupsQuery,
    useUpdatePatternGroupMutation,
} from 'api/queries/patterns';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { SideblockView } from '../../const';

import { FormValues, validationSchema } from './form';
import { ICreateGroupForm } from './types';
import * as S from './units';

export const CreateGroupForm: FC<ICreateGroupForm> = ({
    setSideblockView,
    groupToEdit,
    setGroupToEdit,
    onClose,
}) => {
    const [searchText, setSearchText] = useState('');

    const { data, isLoading } = useGetPatternGroupsQuery();
    const { mutateAsync: createGroup, isPending: isCreating } = useCreatePatternGroupMutation();
    const { mutateAsync: updateGroup, isPending: isUpdating } = useUpdatePatternGroupMutation();
    const isPending = isCreating || isUpdating;
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset } = form;

    const onSubmit = handleSubmit(async (values) => {
        if (groupToEdit) {
            updateGroup({
                id: groupToEdit.id,
                data: { name: values.name, parentId: values.group ?? null },
            });
            showSnackbar({
                message: 'Изменения сохранены',
            });
        } else {
            await createGroup({ name: values.name, parentId: values.group ?? null });
            showSnackbar({
                message: 'Категория создана',
            });
        }
        setSideblockView(SideblockView.FILTER);
        setGroupToEdit(null);
    });

    useEffect(() => {
        if (groupToEdit) {
            reset({ name: groupToEdit.name, group: groupToEdit.parentId });
        }
    }, [groupToEdit]);

    const dataFilterd = (data ?? []).filter((g) =>
        g.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    const groupOptions = dataFilterd.map((group) => ({ id: group.id, value: group.name }));

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit}>
                <S.Container>
                    <S.MainContent>
                        <S.TitleContainer>
                            <Text variant="h5">
                                {groupToEdit ? 'Редактировать' : 'Создать'} группировку
                            </Text>
                            <IconButton onClick={onClose} iconName={Icons.Close} size="large" />
                        </S.TitleContainer>
                        <TextField name="name" disabled={isLoading} label="Название группировки*" />
                        <Autocomplete
                            name="group"
                            label="Родительская группировка"
                            disabled={isLoading}
                            options={groupOptions}
                            onInputChange={(v) => setSearchText(v)}
                        />
                    </S.MainContent>
                    <S.ButtonContainer>
                        <Button
                            fullWidth
                            size="medium"
                            onClick={() => {
                                setSideblockView(SideblockView.FILTER);
                                setGroupToEdit(null);
                            }}
                        >
                            Назад
                        </Button>
                        <Button
                            fullWidth
                            disabled={isLoading || isPending}
                            type="submit"
                            size="medium"
                            variant="contained"
                        >
                            {groupToEdit ? 'Сохранить' : 'Создать'}
                        </Button>
                    </S.ButtonContainer>
                </S.Container>
            </form>
        </FormProvider>
    );
};
