import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    BreadCrumbsItem,
    CapabilityCard,
    CreateMapSideblock,
    DEFAULT_MAP_CHIP,
    DynamicLegend,
    MapFormValues,
    MapVariant,
    TechCapabilityCard,
} from 'features/maps';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { Breadcrumbs, Button, Chip, Skeleton, Tab } from 'components/ui';

import { IMapItemData } from 'api/capability/types';
import { IMapCriteria } from 'api/maps/types';
import { useGetChildrenCapabilitiesQuery, useGetMapDataQuery } from 'api/queries/capability';
import { useCreatePersonalMapMutation, useGetMapCriteriasQuery } from 'api/queries/maps';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { PersonalMapsLibrary } from './components';
import { TABS, TabVariant } from './const';
import * as S from './units';

export const MapPage = () => {
    const [tabVariant, setTabVariant] = useState(TabVariant.GENERAL);
    const [mapVariant, setMapVariant] = useState<MapVariant | IMapCriteria>(MapVariant.DEFAULT);
    const [chipsDisabled, setChipsDisabled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [params, setParams] = useSearchParams();
    const id = params.get('id');
    const tabParam = params.get('tab') as TabVariant | null;

    useEffect(() => {
        if (tabParam && tabParam === TabVariant.PERSONAL) {
            setTabVariant(TabVariant.PERSONAL);
        } else {
            setTabVariant(TabVariant.GENERAL);
        }
    }, [tabParam]);

    const navigate = useNavigate();

    const {
        modalOpened: sideblockOpened,
        openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    const { mutateAsync: createMap } = useCreatePersonalMapMutation();

    const handleFormSave = async (values: MapFormValues) => {
        const { mapId } = await createMap({ ...values, typeId: values.type });
        navigate(`${R.MODELS_PATH}${R.MAP_PATH}${R.ADD_PATH}?id=${mapId}`);
    };

    const {
        data,
        isLoading: isLoadingMapData,
        error,
    } = useGetMapDataQuery(id ? Number(id) : undefined);

    const activeItem = data ? (id ? (data as any as IMapItemData) : data[0]) : null;
    const capabilityType =
        !id || activeItem?.children.some((child) => child.isDomain)
            ? 'bc'
            : activeItem?.children.length === 0 && !activeItem.isDomain
            ? 'tc'
            : 'bc';
    const { data: criteriasData, isLoading: isLoadingCriterias } =
        useGetMapCriteriasQuery(capabilityType);

    const hasSubChildren =
        activeItem?.children.some((child) => child.children.length !== 0) ?? false;

    const { data: childrenCapabilitiesData, isLoading: isLoadingTechCapabilities } =
        useGetChildrenCapabilitiesQuery({
            id: Number(id),
            enabled: !!id && activeItem?.isDomain === false,
        });

    const isLoading = isLoadingMapData || isLoadingTechCapabilities;

    useEffect(() => {
        if (activeItem && !activeItem.isDomain && activeItem.children.length === 0) {
            setMapVariant(MapVariant.DEFAULT);
        } else {
            setChipsDisabled(false);
        }
        setIsExpanded(false);
    }, [activeItem]);

    return (
        <S.PageWrapper>
            <S.Container>
                {!error && (
                    <S.InfoContainer>
                        {id && activeItem?.parent && (
                            <Breadcrumbs>
                                {[...activeItem.parent].reverse().map((item, index) => (
                                    <BreadCrumbsItem
                                        key={item.id}
                                        index={index}
                                        id={item.id}
                                        name={item.name}
                                    />
                                ))}
                            </Breadcrumbs>
                        )}

                        <S.TitleContainer>
                            <S.Title>
                                {id && activeItem ? activeItem.name : 'Карты возможностей'}
                            </S.Title>
                            {!id && (
                                <Button variant="contained" size="small" onClick={openSideblock}>
                                    Создать карту
                                </Button>
                            )}
                        </S.TitleContainer>

                        {!id && (
                            <S.TabsStyled
                                selectedTabIndex={tabVariant === TabVariant.PERSONAL ? 1 : 0}
                            >
                                {TABS.map((tab) => (
                                    <Tab
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                        onClick={(variant) =>
                                            setParams(
                                                new URLSearchParams(
                                                    (variant as TabVariant) === TabVariant.PERSONAL
                                                        ? { tab: TabVariant.PERSONAL }
                                                        : {},
                                                ),
                                            )
                                        }
                                    />
                                ))}
                            </S.TabsStyled>
                        )}

                        {tabVariant === TabVariant.GENERAL && (
                            <>
                                {id && activeItem && (
                                    <>
                                        {activeItem.description && (
                                            <S.Description
                                                isExpanded={isExpanded}
                                                dangerouslySetInnerHTML={{
                                                    __html: activeItem.description,
                                                }}
                                            />
                                        )}
                                        {!activeItem.description &&
                                            (activeItem.children.length !== 0 ||
                                                (childrenCapabilitiesData &&
                                                    childrenCapabilitiesData.techCapabilities
                                                        .length !== 0)) && (
                                                <S.Description isExpanded>
                                                    Описания нет. Посмотреть детальную информацию по
                                                    дочерним элементам можно{' '}
                                                    <Link
                                                        title="в древе ФДМ"
                                                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${activeItem.id}&type=BUSINESS`}
                                                    />
                                                </S.Description>
                                            )}
                                        {isExpanded && (
                                            <Text variant="body2">
                                                Посмотреть детальную информацию по дочерним
                                                элементам можно{' '}
                                                <Link
                                                    title="в древе ФДМ"
                                                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${activeItem.id}&type=BUSINESS`}
                                                />
                                            </Text>
                                        )}
                                        {activeItem.description && (
                                            <S.ExpandButton
                                                onClick={() => setIsExpanded(!isExpanded)}
                                            >
                                                <div>
                                                    {isExpanded ? 'Скрыть' : 'Показать полностью'}
                                                </div>
                                                <S.IconStyled
                                                    iconName={
                                                        isExpanded
                                                            ? Icons.FastArrowTop
                                                            : Icons.FastArrowDown
                                                    }
                                                    size="small"
                                                />
                                            </S.ExpandButton>
                                        )}
                                    </>
                                )}

                                <S.ChipsContainer>
                                    {[
                                        DEFAULT_MAP_CHIP,
                                        ...(criteriasData ?? []).map((criteria) => ({
                                            label: criteria.description ?? '',
                                            value: criteria.id,
                                        })),
                                    ].map((chip, i) => (
                                        <>
                                            <Chip
                                                key={chip.value}
                                                disabled={chipsDisabled && i !== 0}
                                                active={
                                                    chip.value === mapVariant ||
                                                    chip.value === (mapVariant as any)?.id
                                                }
                                                label={chip.label}
                                                onClick={() =>
                                                    setMapVariant(
                                                        criteriasData?.find(
                                                            (criteria) =>
                                                                criteria.id === chip.value,
                                                        ) ?? MapVariant.DEFAULT,
                                                    )
                                                }
                                            />
                                        </>
                                    ))}
                                    {isLoadingCriterias && (
                                        <>
                                            <Skeleton height={32} width={100} />
                                            <Skeleton height={32} width={100} />
                                        </>
                                    )}
                                </S.ChipsContainer>

                                <S.SubtitleContainer>
                                    <S.Subtitle>
                                        {!id || activeItem?.children.some((child) => child.isDomain)
                                            ? 'Домены'
                                            : activeItem?.children.length === 0 &&
                                              !activeItem.isDomain
                                            ? 'Технические возможности'
                                            : 'Бизнес-возможности'}
                                    </S.Subtitle>
                                    {mapVariant !== MapVariant.DEFAULT && (
                                        <DynamicLegend criteria={mapVariant} />
                                    )}
                                </S.SubtitleContainer>
                            </>
                        )}
                    </S.InfoContainer>
                )}

                {!isLoading && error && (
                    <S.ErrorContainer>
                        <NotFoundBlock imageVariant={ImageVariants.QUESTION_BOX} />
                    </S.ErrorContainer>
                )}

                {tabVariant === TabVariant.GENERAL && (
                    <>
                        {isLoading && (
                            <S.CardContainer>
                                <Skeleton radius={15} height={100} />
                                <Skeleton radius={15} height={100} />
                                <Skeleton radius={15} height={100} />
                            </S.CardContainer>
                        )}
                        {activeItem &&
                            activeItem.children.length === 0 &&
                            ((!childrenCapabilitiesData && !isLoadingTechCapabilities) ||
                                childrenCapabilitiesData?.techCapabilities.length === 0) && (
                                <S.NotFoundContainer>
                                    <NotFoundBlock
                                        imageVariant={ImageVariants.EMPTY_BOX}
                                        title="Возможностей нет"
                                        text=""
                                    />
                                </S.NotFoundContainer>
                            )}
                        {activeItem && hasSubChildren && (
                            <S.CardContainer>
                                {activeItem.children.map((topLevelChild) => (
                                    <CapabilityCard
                                        key={topLevelChild.id}
                                        item={topLevelChild}
                                        mapVariant={mapVariant}
                                    />
                                ))}
                            </S.CardContainer>
                        )}
                        {!isLoading && id && activeItem && !hasSubChildren && (
                            <S.CardGridContainer>
                                {activeItem.children.map((c) => (
                                    <CapabilityCard
                                        withinGrid
                                        key={c.id}
                                        item={{ ...c, children: [] }}
                                        mapVariant={mapVariant}
                                    />
                                ))}
                                {(childrenCapabilitiesData?.techCapabilities ?? []).map(
                                    (techCapability) => (
                                        <TechCapabilityCard
                                            key={techCapability.id}
                                            techCapability={techCapability}
                                            mapVariant={mapVariant}
                                        />
                                    ),
                                )}
                            </S.CardGridContainer>
                        )}
                    </>
                )}

                {tabVariant === TabVariant.PERSONAL && <PersonalMapsLibrary />}
            </S.Container>
            <CreateMapSideblock
                isOpen={sideblockOpened}
                onClose={closeSideblock}
                onSave={handleFormSave}
            />
        </S.PageWrapper>
    );
};
