import React, { FC, useEffect, useMemo, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Banner, Button, Checkbox, Search, Skeleton } from 'components/ui';

import {
    CapabilitySearchResultTypeVariant,
    CapabilitySearchVariant,
    ISearchResult,
} from 'api/capability/types';
import { useGetCapabilitiesQuery } from 'api/queries/capability';
import { useDebounce } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IAddCapabilitySideblockProps } from './types';
import * as S from './units';

const getCapabilityLabel = (capabilityType: IAddCapabilitySideblockProps['capabilityType']) =>
    capabilityType === CapabilitySearchVariant.BUSINESS_CAPABILITY ? 'ВС' : 'ТС';

export const AddCapabilitySideblock: FC<IAddCapabilitySideblockProps> = ({
    isOpen,
    capabilityType,
    excludedCapabilityCodes,
    onAdd,
    onClose,
}) => {
    const [search, setSearch] = useState('');
    const searchDebounced = useDebounce(search);

    const [selectedCapabilities, setSelectedCapabilities] = useState<ISearchResult[]>([]);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const capabilityLabel = getCapabilityLabel(capabilityType);

    const { data, error, isError, isFetching } = useGetCapabilitiesQuery({
        search: searchDebounced,
        searchVariant: capabilityType,
    });

    const availableCapabilities = useMemo(
        () => data?.filter(({ code }) => !excludedCapabilityCodes.includes(code)) ?? [],
        [data, excludedCapabilityCodes],
    );

    const reset = () => {
        setSearch('');
        setSelectedCapabilities([]);
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleClear = () => {
        setSearch('');
        setSelectedCapabilities([]);
    };

    const toggleCapability = (capability: ISearchResult) => {
        setSelectedCapabilities((currentCapabilities) =>
            currentCapabilities.some(({ id }) => id === capability.id)
                ? currentCapabilities.filter(({ id }) => id !== capability.id)
                : [...currentCapabilities, capability],
        );
    };

    const handleAdd = () => {
        if (selectedCapabilities.length === 0) {
            return;
        }

        onAdd(selectedCapabilities);
        showSnackbar({ message: `${capabilityLabel} добавлены` });
        handleClose();
    };

    return (
        <SideBlock large hasBackdrop isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.Content>
                    <S.Header>
                        <Text variant="h5">Добавление {capabilityLabel}</Text>
                    </S.Header>
                    <S.SearchContainer>
                        <Search
                            fullWidth
                            placeholder="Название или код"
                            size="small"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            onClear={handleClear}
                        />
                    </S.SearchContainer>
                    {isError && (
                        <S.ErrorContainer>
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title={
                                    error instanceof Error
                                        ? error.message
                                        : 'Не удалось загрузить каталог возможностей'
                                }
                            />
                        </S.ErrorContainer>
                    )}
                    {isFetching && (
                        <S.LoadingState>
                            <Skeleton radius={12} height={80} />
                        </S.LoadingState>
                    )}
                    {!isFetching && availableCapabilities.length > 0 && (
                        <S.Results>
                            {availableCapabilities.map((capability) => {
                                const selected = selectedCapabilities.some(
                                    ({ id }) => id === capability.id,
                                );
                                const resultLabel =
                                    capability.type ===
                                    CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY
                                        ? 'ВС'
                                        : 'ТС';

                                return (
                                    <S.CapabilityCard key={capability.id}>
                                        <Checkbox
                                            checked={selected}
                                            aria-label={`Выбрать ${capability.name}`}
                                            onChange={() => toggleCapability(capability)}
                                        />
                                        <S.CapabilityInfo>
                                            <S.CapabilityType>{resultLabel}</S.CapabilityType>
                                            <Text link pointer variant="body3">
                                                {capability.name}
                                            </Text>
                                            <Text inactive variant="body3">
                                                {capability.code}
                                            </Text>
                                        </S.CapabilityInfo>
                                    </S.CapabilityCard>
                                );
                            })}
                        </S.Results>
                    )}
                    {!!search && !isFetching && availableCapabilities.length === 0 && (
                        <S.EmptyState>
                            <NotFoundBlock
                                smallImage
                                imageVariant={ImageVariants.SEARCH}
                                setMinSize={false}
                                text="Попробуйте изменить запрос"
                                title="Нет результатов"
                            />
                        </S.EmptyState>
                    )}
                </S.Content>
                <S.Footer>
                    <Button size="medium" variant="outlined" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button
                        disabled={selectedCapabilities.length === 0}
                        size="medium"
                        variant="contained"
                        onClick={handleAdd}
                    >
                        Добавить
                    </Button>
                </S.Footer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
