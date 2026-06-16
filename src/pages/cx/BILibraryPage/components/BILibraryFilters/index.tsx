import React, { FC, useState } from 'react';

import { IconButton } from 'components/ui';
import { Autocomplete, Button, Select } from 'components/ui';

import { useGetBIChannelsQuery } from 'api/queries/bi-library';
import { useGetProductsQuery } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { CharacterVariant, ProductVariant, StatusVariant } from './const';
import { IBILibraryFilters } from './types';
import * as S from './units';

export const BILibraryFilters: FC<IBILibraryFilters> = ({
    filterOptions,
    setFilterOptions,
    onClose,
    resetFilters,
    hasActiveFilters,
}) => {
    const [productFilterText, setProductFilterText] = useState('');

    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery();
    const { data: channels } = useGetBIChannelsQuery();

    const productOptions = [
        { id: ProductVariant.ALL, value: 'Все' },
        ...(productsData
            ? productsData
                  .filter((product) =>
                      product.name.toLowerCase().includes(productFilterText.toLowerCase()),
                  )
                  .map((product) => ({
                      id: Number(product.id),
                      value: product.name,
                  }))
            : []),
    ];

    const characterOptions = [
        { id: CharacterVariant.ALL, value: 'Все' },
        { id: CharacterVariant.TARGET, value: 'Целевой' },
        { id: CharacterVariant.ACTUAL, value: 'Фактический' },
    ];

    const statusOptions = [
        { id: StatusVariant.ALL, value: 'Все' },
        { id: StatusVariant.DRAFT, value: 'Черновик' },
        { id: StatusVariant.PUBLISHED, value: 'Опубликован' },
    ];

    const channelOptions = channels?.map((c) => ({ id: c.id, value: c.name })) ?? [];

    return (
        <>
            <S.Overlay onClick={onClose} />
            <S.Container>
                <S.MainContent>
                    <S.FlexWrapper>
                        <S.SideBlockTitle>Фильтры</S.SideBlockTitle>

                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.FlexWrapper>

                    <S.FiltersContainer>
                        <Autocomplete
                            fullWidth
                            disabled={isLoadingProducts}
                            label="Приложение"
                            options={productOptions}
                            renderValue={(v) => v.value}
                            type="select"
                            value={
                                productOptions.find(
                                    (option) => option.id === filterOptions.product,
                                ) ?? null
                            }
                            onChange={(value) => {
                                setProductFilterText('');
                                setFilterOptions({
                                    ...filterOptions,
                                    product:
                                        value.id === ProductVariant.ALL
                                            ? ProductVariant.ALL
                                            : Number(value.id),
                                });
                            }}
                            onInputChange={(v) => {
                                setProductFilterText(v);
                                setFilterOptions({ ...filterOptions, product: null });
                            }}
                            onInputClear={() => {
                                setProductFilterText('');
                                setFilterOptions({ ...filterOptions, product: null });
                            }}
                        />
                        <Select
                            fullWidth
                            label="Статус"
                            options={statusOptions}
                            values={
                                filterOptions.status
                                    ? [
                                          statusOptions.find(
                                              (option) => option.id === filterOptions.status,
                                          )!,
                                      ]
                                    : []
                            }
                            onChange={(values) =>
                                setFilterOptions({ ...filterOptions, status: values[0].id })
                            }
                        />
                        <Select
                            fullWidth
                            label="Характеристики"
                            options={characterOptions}
                            values={
                                filterOptions.character
                                    ? [
                                          characterOptions.find(
                                              (option) => option.id === filterOptions.character,
                                          )!,
                                      ]
                                    : []
                            }
                            onChange={(values) =>
                                setFilterOptions({ ...filterOptions, character: values[0].id })
                            }
                        />
                        <Select
                            fullWidth
                            multiple
                            label="Каналы"
                            options={channelOptions}
                            values={channelOptions.filter((opt) =>
                                filterOptions.channel.includes(opt.id),
                            )}
                            onChange={(selectedOptions) =>
                                setFilterOptions({
                                    ...filterOptions,
                                    channel: selectedOptions.map((o) => Number(o.id)),
                                })
                            }
                        />
                        {/* <Select
                            fullWidth
                            label="Теги"
                            options={characterOptions}
                            values={[]}
                            onChange={(values) =>
                                setFilterOptions({ ...filterOptions, character: values[0].id })
                            }
                        /> */}
                    </S.FiltersContainer>
                </S.MainContent>
                <S.ButtonContainer>
                    <Button
                        disabled={!hasActiveFilters}
                        variant="plain"
                        onClick={() => resetFilters()}
                    >
                        Сбросить
                    </Button>
                </S.ButtonContainer>
            </S.Container>
        </>
    );
};
