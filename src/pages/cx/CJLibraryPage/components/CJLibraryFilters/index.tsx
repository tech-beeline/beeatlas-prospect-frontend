import React, { FC, useState } from 'react';

import { IconButton } from 'components/ui';
import { Autocomplete, Button, Select, Switch } from 'components/ui';

import { CJLibraryStatus } from 'api/cj/types';
// import { useGetBIChannelsQuery } from 'api/queries/bi-library';
import { useGetProductsQuery } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { FormatVariant, ProductVariant } from './const';
import { ICJLibraryFilters } from './types';
import * as S from './units';

export const CJLibraryFilters: FC<ICJLibraryFilters> = ({
    filterOptions,
    setFilterOptions,
    onClose,
    resetFilters,
    hasActiveFilters,
}) => {
    const [productFilterText, setProductFilterText] = useState('');

    const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery();
    // const { data: channels } = useGetBIChannelsQuery();
    const productOptions = [
        { id: ProductVariant.ALL, value: 'Все' },
        ...(products
            ? products
                  .filter((product) =>
                      product.name.toLowerCase().includes(productFilterText.toLowerCase()),
                  )
                  .map((product) => ({
                      id: Number(product.id),
                      value: product.name,
                  }))
            : []),
    ];

    const draftOptions = [
        { id: CJLibraryStatus.ALL, value: 'Все' },
        { id: CJLibraryStatus.DRAFT, value: 'Черновик' },
        { id: CJLibraryStatus.PUBLISHED, value: 'Опубликован' },
    ];

    const formatOptions = [
        { id: FormatVariant.ALL, value: 'Все' },
        { id: FormatVariant.BPMN, value: 'BPMN' },
        { id: FormatVariant.BEEATLAS, value: 'BEEATLAS' },
    ];

    // const channelOptions = channels?.map((c) => ({ id: c.id, value: c.name })) ?? [];
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
                        {window.FEATURE_FLAGS.FLAG_IS_PROD === false && (
                            <Switch
                                label="Показать CJ c дашбордами в grafana"
                                checked={filterOptions.grafana}
                                onChange={(e) =>
                                    setFilterOptions({
                                        ...filterOptions,
                                        grafana: e.target.checked,
                                    })
                                }
                            />
                        )}
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
                            options={draftOptions}
                            values={
                                filterOptions.status
                                    ? [
                                          draftOptions.find(
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
                            label="Формат"
                            options={formatOptions}
                            values={
                                filterOptions.format !== FormatVariant.ALL
                                    ? [
                                          formatOptions.find(
                                              (opt) => opt.id === filterOptions.format,
                                          ) ?? formatOptions[0],
                                      ]
                                    : [formatOptions[0]]
                            }
                            onChange={(values) =>
                                setFilterOptions({ ...filterOptions, format: values[0].id })
                            }
                        />
                        {/* <Select
                            fullWidth
                            multiple
                            label="Каналы"
                            options={channelOptions}
                            values={
                                filterOptions.channel
                                    .map((id) => channelOptions.find((opt) => opt.id === id))
                                    .filter(Boolean) as Array<{ id: number; value: string }>
                            }
                            onChange={(values) =>
                                setFilterOptions({
                                    ...filterOptions,
                                    channel: values.map((v) => v.id),
                                })
                            }
                        />
                        <Select
                            fullWidth
                            label="Теги"
                            options={formatOptions}
                            values={[]}
                            onChange={(values) =>
                                setFilterOptions({ ...filterOptions, format: values[0].id })
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
