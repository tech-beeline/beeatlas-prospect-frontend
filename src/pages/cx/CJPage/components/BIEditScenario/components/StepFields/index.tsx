import React, { FC, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Text } from 'components/core';
import { Autocomplete, TextArea } from 'components/form';
import { ClampedText } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Button, Skeleton } from 'components/ui';

import {
    useGetAllProductsQuery,
    useGetProductStructurizrInterfacesByCmdbQuery,
    useGetSystemTCByIdQuery,
} from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { FormValues } from '../../form';

import { IStepFields } from './types';
import * as S from './units';

export const StepFields: FC<IStepFields> = ({
    index,
    handleAddClick,
    handleRemoveClick,
    isLast,
    totalFields,
}) => {
    const [searchTextProduct, setSearchTextProduct] = useState('');
    const [searchTextTC, setSearchTextTC] = useState('');
    const [searchTextIface, setSearchTextIface] = useState('');
    const [searchTextOperation, setSearchTextOperation] = useState('');

    const { watch, setValue } = useFormContext<FormValues>();
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const productId = watch(`steps.${index}.product`);
    const ifaceId = watch(`steps.${index}.iface`);
    const stepName = watch(`steps.${index}.stepName`);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setValue(`steps.${index}.tc`, null);
        setValue(`steps.${index}.iface`, null);
        setValue(`steps.${index}.operation`, null);

        setSearchTextTC('');
        setSearchTextIface('');
        setSearchTextOperation('');
    }, [productId, setValue]);

    useEffect(() => {
        if (!ifaceId) {
            setValue(`steps.${index}.operation`, null);
            setSearchTextOperation('');
        }
    }, [ifaceId]);

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
        id: Number(product.id),
        value: product.name,
    }));

    const uniqueTcData = (tcData ?? []).filter(
        (tc, index, self) => index === self.findIndex((t) => t.id === tc.id),
    );

    const tcFiltered = uniqueTcData.filter((tc) => {
        const search = searchTextTC.toLowerCase();
        return (
            (tc.name != null && tc.name.toLowerCase().includes(search)) ||
            (tc.code != null && tc.code.toLowerCase().includes(search))
        );
    });

    const tcOptions = tcFiltered.map((tc) => ({ id: tc.id, value: tc.name, code: tc.code }));

    const ifacesFiltered = (archData ?? []).filter((iface) =>
        iface.name.toLowerCase().includes(searchTextIface.toLowerCase()),
    );
    const ifaceOptions = ifacesFiltered.map((iface) => ({ id: iface.id, value: iface.name }));

    const selectedIface = (archData ?? []).find((arch) => arch.id === ifaceId);
    const operationFiltered = [...(selectedIface?.operations ?? [])].filter((operation) =>
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
                <Text variant="subtitle1">
                    <ClampedText
                        text={stepName}
                        tooltipId={`title-${index}`}
                        noArrow
                        place="top"
                        offset={8}
                    />
                    {/* {selectedTc ? (
                        <TooltipContainer
                            text={selectedTc.name}
                            tooltipId={`title-relation-${index}-tc-${selectedTc.id}`}
                        />
                    ) : selectedProduct ? (
                        <TooltipContainer
                            text={selectedProduct.name}
                            tooltipId={`title-relation-product-${index}-${selectedProduct.id}`}
                        />
                    ) : (
                        `Вызов ${index + 1}`
                    )} */}
                </Text>
                {totalFields > 1 && (
                    <IconButton
                        variant="plain"
                        size="medium"
                        iconName={Icons.Delete}
                        type="button"
                        onClick={() => handleRemoveClick(index)}
                    />
                )}
            </S.FlexWrapper>
            <S.LinkWrapper>
                <S.LinkBlock>
                    <S.LinkTextField>
                        {isLoadingProducts ? (
                            <Skeleton width={335} height={50} variant="square" />
                        ) : (
                            <Autocomplete
                                fullWidth
                                disabled={isLoadingProducts}
                                label="Приложение"
                                name={`steps.${index}.product`}
                                options={productsOptions}
                                onInputChange={(v) => setSearchTextProduct(v)}
                                makeOption={(option) => {
                                    return (
                                        <ClampedText
                                            text={option.value}
                                            tooltipId={`product-name-${index}-${option.id}`}
                                            noArrow
                                            place="top"
                                            offset={8}
                                        />
                                    );
                                }}
                            />
                        )}
                        {isLoadingTC ? (
                            <Skeleton width={335} height={50} variant="square" />
                        ) : (
                            <Autocomplete
                                key={`tc-autocomplete-${productId}`}
                                fullWidth
                                disabled={!productId || isLoadingTC}
                                label="Техническая возможность"
                                name={`steps.${index}.tc`}
                                options={tcOptions}
                                onInputChange={(v) => setSearchTextTC(v)}
                                makeOption={(option) => {
                                    return (
                                        <div>
                                            <ClampedText
                                                text={option.value}
                                                tooltipId={`tc-name-${index}-${option.id}`}
                                                noArrow
                                                place="top"
                                                offset={8}
                                            />
                                            <Text variant="body3" inactive>
                                                {option.code}
                                            </Text>
                                        </div>
                                    );
                                }}
                            />
                        )}
                        {isLoadingArch ? (
                            <Skeleton width={335} height={50} variant="square" />
                        ) : (
                            <Autocomplete
                                fullWidth
                                key={`iface-${productId}`}
                                disabled={!productId}
                                label="Интерфейс"
                                name={`steps.${index}.iface`}
                                options={ifaceOptions}
                                onInputChange={(v) => setSearchTextIface(v)}
                                makeOption={(option) => {
                                    return (
                                        <ClampedText
                                            text={option.value}
                                            tooltipId={`iface-name-${index}-${option.id}`}
                                            noArrow
                                            place="top"
                                            offset={8}
                                        />
                                    );
                                }}
                            />
                        )}
                        {isLoadingArch ? (
                            <Skeleton width={335} height={50} variant="square" />
                        ) : (
                            <Autocomplete
                                key={`op-${productId}-${ifaceId}`}
                                fullWidth
                                disabled={!productId || !ifaceId}
                                label="Endpoint"
                                name={`steps.${index}.operation`}
                                options={operationOptions}
                                onInputChange={(v) => setSearchTextOperation(v)}
                                makeOption={(option) => {
                                    return (
                                        <ClampedText
                                            text={option.value}
                                            tooltipId={`op-name-${index}-${option.id}`}
                                            noArrow
                                            place="top"
                                            offset={8}
                                        />
                                    );
                                }}
                            />
                        )}
                        <TextArea name={`steps.${index}.description`} label="Описание вызова" />
                    </S.LinkTextField>
                </S.LinkBlock>
            </S.LinkWrapper>
            {isLast && (
                <S.ButtonContainer>
                    <Button variant="outlined" size="small" type="button" onClick={handleAddClick}>
                        Добавить вызов
                    </Button>
                </S.ButtonContainer>
            )}
        </S.LinkContainer>
    );
};
