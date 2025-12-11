import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Autocomplete, TextArea } from 'components/form';

import {
    useGetProductStructurizrInterfacesByCmdbQuery,
    useGetSystemTCByIdQuery,
} from 'api/queries/product';
import { useGetProductsQuery } from 'hooks';

import { FormValues } from '../../form';

import { IStepFields } from './types';
import * as S from './units';

export const StepFields: FC<IStepFields> = ({ index, handleAddClick, handleRemoveClick }) => {
    const [searchTextProduct, setSearchTextProduct] = useState('');
    const [searchTextTC, setSearchTextTC] = useState('');
    const [searchTextIface, setSearchTextIface] = useState('');
    const [searchTextOperation, setSearchTextOperation] = useState('');

    const { watch } = useFormContext<FormValues>();
    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery();
    const productId = watch(`steps.${index}.product`);

    const productCmdb = (productsData ?? []).find(
        (product) => !!productId && Number(product.id) === Number(productId),
    )?.alias;

    const { data: tcData, isLoading: isLoadingTC } = useGetSystemTCByIdQuery(productId);
    const { data: archData, isLoading: isLoadingArch } =
        useGetProductStructurizrInterfacesByCmdbQuery(productCmdb);

    const productsFiltered = (productsData ?? []).filter((product) =>
        product.name.toLowerCase().includes(searchTextProduct.toLowerCase()),
    );
    const productsOptions = productsFiltered.map((product) => ({
        id: product.id,
        value: product.name,
    }));

    const tcFiltered = (tcData ?? []).filter((tc) =>
        tc.name.toLowerCase().includes(searchTextTC.toLowerCase()),
    );
    const tcOptions = tcFiltered.map((tc) => ({ id: tc.id, value: tc.name }));

    const ifacesFiltered = (archData ?? []).filter((iface) =>
        iface.name.toLowerCase().includes(searchTextIface.toLowerCase()),
    );
    const ifaceOptions = ifacesFiltered.map((iface) => ({ id: iface.id, value: iface.name }));

    const operationFiltered = (archData ?? [])
        .reduce(
            (acc, v) => [...acc, ...v.operations],
            [] as { id: string; name: string; type: string }[],
        )
        .filter((operation) =>
            `${operation.type} ${operation.name}`
                .toLowerCase()
                .includes(searchTextOperation.toLowerCase()),
        );
    const operationOptions = operationFiltered.map((operation) => ({
        id: Number(operation.id),
        value: `${operation.type} ${operation.name}`,
    }));
    return (
        <S.LinkContainer>
            <S.FlexWrapper>
                <Text variant="subtitle1">Вызов {index + 1}</Text>
                {index === 0 && (
                    <Button
                        variant="plain"
                        size="small"
                        startIcon={<Icon iconName={Icons.Add} color="blue" />}
                        type="button"
                        onClick={handleAddClick}
                    >
                        Добавить
                    </Button>
                )}
                {index !== 0 && (
                    <Button
                        variant="plain"
                        size="small"
                        startIcon={<Icon iconName={Icons.Delete} color="blue" />}
                        type="button"
                        onClick={() => handleRemoveClick(index)}
                    >
                        Удалить
                    </Button>
                )}
            </S.FlexWrapper>
            <S.LinkWrapper>
                <S.LinkBlock>
                    <S.LinkTextField>
                        <Autocomplete
                            fullWidth
                            disabled={isLoadingProducts}
                            label="Приложение"
                            name={`steps.${index}.product`}
                            options={productsOptions}
                            onInputChange={(v) => setSearchTextProduct(v)}
                        />
                        <Autocomplete
                            fullWidth
                            disabled={!productId || isLoadingTC}
                            label="Техническая возможность"
                            name={`steps.${index}.tc`}
                            options={tcOptions}
                            onInputChange={(v) => setSearchTextTC(v)}
                        />
                        <Autocomplete
                            fullWidth
                            disabled={!productId || isLoadingArch}
                            label="Интерфейс"
                            name={`steps.${index}.iface`}
                            options={ifaceOptions}
                            onInputChange={(v) => setSearchTextIface(v)}
                        />
                        <Autocomplete
                            fullWidth
                            disabled={!productId || isLoadingArch}
                            label="Endpoint"
                            name={`steps.${index}.operation`}
                            options={operationOptions}
                            onInputChange={(v) => setSearchTextOperation(v)}
                        />
                        <TextArea name={`steps.${index}.description`} label="Описание вызова" />
                    </S.LinkTextField>
                </S.LinkBlock>
            </S.LinkWrapper>
        </S.LinkContainer>
    );
};
