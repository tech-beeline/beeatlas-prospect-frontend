import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Autocomplete, TextArea } from 'components/form';

import { useGetTS } from 'api/queries/bi';
import { useGetProductsQuery } from 'hooks';

import { FormValues, validationSchema } from './form';
import { IBIEditScenario } from './types';
import * as S from './units';

export const BIEditScenario: FC<IBIEditScenario> = ({ isOpen, onClose }) => {
    const [searchText, setSearchText] = useState('');
    const [calls, setCalls] = useState<{ id: number; url: string; description: string }[]>([]);

    const { data: techCapability, isLoading: techCapabilityLoading } = useGetTS();
    const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery();

    const techCapabilityFilterd = (techCapability ?? []).filter((g) =>
        g.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    const productsFilterd = (products ?? []).filter((g) =>
        g.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    const productsOptions = productsFilterd.map((group) => ({ id: group.id, value: group.name }));
    const techCapabilityOptions = techCapabilityFilterd.map((group) => ({
        id: group.id,
        value: group.name,
    }));

    const addCall = () => {
        setCalls((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                url: '',
                description: '',
            },
        ]);
    };

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large>
            <S.Container>
                <FormProvider {...form}>
                    <form onSubmit={() => []}>
                        <S.Content hasButtons>
                            <S.FlexWrapper>
                                <S.SideBlockTitle>Редактирование шага сценария BI</S.SideBlockTitle>

                                <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                            </S.FlexWrapper>

                            <S.LinkContainer>
                                <S.FlexWrapper>
                                    <Text variant="subtitle1">Вызов 1</Text>
                                    <Button
                                        variant="plain"
                                        size="small"
                                        startIcon={<Icon iconName={Icons.Add} color="blue" />}
                                        onClick={addCall}
                                        type="button"
                                    >
                                        {' '}
                                        Добавить
                                    </Button>
                                </S.FlexWrapper>
                                <S.LinkWrapper>
                                    {calls.map((call) => (
                                        <S.LinkBlock key={call.id}>
                                            <S.LinkTextField>
                                                <Autocomplete
                                                    fullWidth
                                                    disabled={isLoadingProducts}
                                                    label="Приложение"
                                                    name="group"
                                                    options={productsOptions}
                                                    onInputChange={(v) => setSearchText(v)}
                                                />
                                                <Autocomplete
                                                    fullWidth
                                                    disabled={techCapabilityLoading}
                                                    label="Техническая возможность"
                                                    name="group"
                                                    options={techCapabilityOptions}
                                                    onInputChange={(v) => setSearchText(v)}
                                                />
                                                <Autocomplete
                                                    fullWidth
                                                    disabled={isLoadingProducts}
                                                    label="Endpoint"
                                                    name="group"
                                                    options={[]}
                                                    onInputChange={(v) => setSearchText(v)}
                                                />
                                                <Autocomplete
                                                    fullWidth
                                                    disabled={isLoadingProducts}
                                                    label="Интерфейс"
                                                    name="group"
                                                    options={[]}
                                                    onInputChange={(v) => setSearchText(v)}
                                                />
                                                <TextArea name="descr" label="Описание вызова" />
                                            </S.LinkTextField>
                                        </S.LinkBlock>
                                    ))}
                                </S.LinkWrapper>
                            </S.LinkContainer>
                        </S.Content>

                        <S.ButtonContainer>
                            <Button type="button" onClick={onClose}>
                                Отменить
                            </Button>

                            <Button disabled={true} type="submit" variant="contained">
                                Сохранить
                            </Button>
                        </S.ButtonContainer>
                    </form>
                </FormProvider>
            </S.Container>
        </SideBlock>
    );
};
