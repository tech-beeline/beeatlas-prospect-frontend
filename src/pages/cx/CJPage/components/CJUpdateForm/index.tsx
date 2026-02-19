import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { SideBlock } from 'components/containers';
// import { Text } from 'components/core';
import { TextField } from 'components/form';

import { useUpdateCJMutation } from 'api/queries/cj';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, validationSchema } from './form';
import { ICJUpdateForm } from './types';
import * as S from './units';

export const CJUpdateForm: FC<ICJUpdateForm> = ({ values, cjId, isOpen, onClose }) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { mutateAsync: updateCJ, isPending: updatingCj } = useUpdateCJMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, setError } = form;

    useEffect(() => reset(values), [values]);

    // const [links, setLinks] = useState<{ id: number; url: string; description: string }[]>([]);

    // const addLink = () => {
    //     setLinks((prev) => [
    //         ...prev,
    //         {
    //             id: prev.length + 1,
    //             url: '',
    //             description: '',
    //         },
    //     ]);
    // };

    // const removeLink = (id: number) => {
    //     setLinks((prev) =>
    //         prev
    //             .filter((link) => link.id !== id)
    //             .map((link, index) => ({
    //                 ...link,
    //                 id: index + 1,
    //             })),
    //     );
    // };

    const onSubmit = handleSubmit(async (values) => {
        try {
            await updateCJ({
                id: String(cjId),
                data: {
                    name: values.name,
                    user_portrait: values.userPortrait,
                },
            });
            showSnackbar({ message: 'Изменения сохранены' });
            onClose();
            reset();
        } catch (error) {
            if ((error as AxiosError).response?.status === 422) {
                setError('name', { message: 'Название CJ должно быть уникальным' });
            }
        }
    });

    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true}>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={onSubmit}>
                        <S.Content hasButtons>
                            <S.FlexWrapper>
                                <S.SideBlockTitle>Настройка CJ</S.SideBlockTitle>

                                <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                            </S.FlexWrapper>

                            <S.TextFieldContainer>
                                <TextField label="Название" name="name" />

                                <TextField label="Портрет пользователя" name="userPortrait" />
                            </S.TextFieldContainer>

                            {/* /*<S.LinkContainer>
                                <S.FlexWrapper>
                                    <Text variant="subtitle1">Полезные ссылки</Text>
                                    <Button
                                        variant="plain"
                                        size="small"
                                        startIcon={<Icon iconName={Icons.Add} color="blue" />}
                                        onClick={addLink}
                                        type="button"
                                    >
                                        {' '}
                                        Добавить
                                    </Button>
                                </S.FlexWrapper>
                                <S.LinkWrapper>
                                    {links.map((link, index) => (
                                        <S.LinkBlock key={link.id}>
                                            <S.FlexWrapper>
                                                <Text variant="subtitle2">Ссылка {index + 1}</Text>

                                                <Button
                                                    startIcon={
                                                        <Icon
                                                            iconName={Icons.Delete}
                                                            color="blue"
                                                        />
                                                    }
                                                    onClick={() => removeLink(link.id)}
                                                    size="small"
                                                    variant="plain"
                                                    type="button"
                                                >
                                                    Удалить
                                                </Button>
                                            </S.FlexWrapper>

                                            <S.LinkTextField>
                                                <TextField
                                                    label="Ссылка"
                                                    name={`links.${index}.url`}
                                                />
                                                <TextField
                                                    label="Описание ссылки"
                                                    name={`links.${index}.description`}
                                                />
                                            </S.LinkTextField>
                                        </S.LinkBlock>
                                    ))}
                                </S.LinkWrapper>
                            </S.LinkContainer> */}
                        </S.Content>

                        <S.ButtonContainer>
                            <Button type="button" onClick={onClose}>
                                Отменить
                            </Button>

                            <Button disabled={updatingCj} type="submit" variant="contained">
                                Сохранить
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </S.Container>
        </SideBlock>
    );
};

export type { FormValues } from './form';
