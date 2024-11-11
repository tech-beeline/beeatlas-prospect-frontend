import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Chip, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { CreateMapSideblock } from 'features/maps';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import { IMapItemData } from 'api/capability/types';
import { useGetChildrenCapabilitiesQuery, useGetMapDataQuery } from 'api/queries/capability';
import { useModal } from 'hooks';
import * as ROUTER from 'router/const';

import {
    BreadCrumbsItem,
    CapabilityCard,
    PersonalMapsLibrary,
    ScenariosLegend,
    TechCapabilitiesLegend,
    TechCapabilityCard,
} from './components';
import { CHIPS, MapVariant, TabVariant } from './const';
import * as S from './units';

export const MapPage = () => {
    const [tabVariant] = useState(TabVariant.GENERAL);
    // const [activeItem, setActiveItem] = useState<IMapItemData | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [params] = useSearchParams();
    const id = params.get('id');

    const {
        modalOpened: sideblockOpened,
        // openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    const [mapVariant, setMapVariant] = useState(MapVariant.DEFAULT);
    const [chipsDisabled, setChipsDisabled] = useState(false);

    const {
        data,
        isLoading: isLoadingMapData,
        error,
    } = useGetMapDataQuery(id ? Number(id) : undefined);
    const activeItem = data ? (id ? (data as any as IMapItemData) : data[0]) : null;

    const { data: childrenCapabilitiesData, isLoading: isLoadingTechCapabilities } =
        useGetChildrenCapabilitiesQuery({
            id: Number(id),
            enabled: !!id && activeItem?.isDomain === false,
        });

    const isLoading = isLoadingMapData || isLoadingTechCapabilities;

    useEffect(() => {
        if (activeItem && !activeItem.isDomain && activeItem.children.length === 0) {
            setMapVariant(MapVariant.DEFAULT);
            setChipsDisabled(true);
        } else {
            setChipsDisabled(false);
        }
    }, [activeItem]);

    const descriptionRef = useRef<HTMLDivElement>(null);

    const Legend =
        mapVariant === MapVariant.E2E_SCENARIOS ? ScenariosLegend : TechCapabilitiesLegend;

    const hasSubChildren =
        activeItem?.children.some((child) => child.children.length !== 0) ?? false;

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
                            {/* {!id && (
                            <Button variant="contained" size="small" onClick={openSideblock}>
                                Создать карту
                            </Button>
                        )} */}
                        </S.TitleContainer>

                        {/* {!id && (
                        <S.TabsStyled>
                            {TABS.map((tab) => (
                                <Tab
                                    key={tab.value}
                                    label={tab.label}
                                    value={tab.value}
                                    onClick={setTabVariant}
                                />
                            ))}
                        </S.TabsStyled>
                    )} */}

                        {tabVariant === TabVariant.GENERAL && (
                            <>
                                {id && activeItem && activeItem.description && (
                                    <>
                                        <S.Description
                                            ref={descriptionRef}
                                            isExpanded={isExpanded}
                                            dangerouslySetInnerHTML={{
                                                __html: activeItem.description,
                                            }}
                                        />
                                        {isExpanded && (
                                            <Text variant="body2">
                                                Посмотреть детальную информацию по дочерним
                                                элементам можно{' '}
                                                <Link
                                                    title="в древе ФДМ"
                                                    url={`${ROUTER.MODELS_PATH}${ROUTER.FDM_PATH}?id=${activeItem.id}&type=BUSINESS`}
                                                />
                                            </Text>
                                        )}
                                        <S.ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
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
                                    </>
                                )}

                                <S.ChipsContainer>
                                    {CHIPS.map((chip, i) => (
                                        <Chip
                                            key={i}
                                            disabled={chipsDisabled && i !== 0}
                                            active={chip.value === mapVariant}
                                            label={chip.label}
                                            onClick={() => setMapVariant(chip.value)}
                                        />
                                    ))}
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
                                    {mapVariant !== MapVariant.DEFAULT && <Legend />}
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

                {tabVariant === TabVariant.PERSONAL && <PersonalMapsLibrary />}

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
                                        />
                                    ),
                                )}
                            </S.CardGridContainer>
                        )}
                    </>
                )}
            </S.Container>
            <CreateMapSideblock isOpen={sideblockOpened} onClose={closeSideblock} />
        </S.PageWrapper>
    );
};
