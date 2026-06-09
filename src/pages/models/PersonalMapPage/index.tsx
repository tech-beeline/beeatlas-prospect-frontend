import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    BreadCrumbsItem,
    CapabilityCard,
    DEFAULT_MAP_CHIP,
    DynamicLegend,
    MapVariant,
    TechCapabilityCard,
} from 'features/maps';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { Breadcrumbs, Chip, Skeleton } from 'components/ui';

import { IMapItemData } from 'api/capability/types';
import { IMapCriteria } from 'api/maps/types';
import { useGetChildrenCapabilitiesQuery, useGetMapDataQuery } from 'api/queries/capability';
import { useGetMapCriteriasQuery, useGetPersonalMapByIdQuery } from 'api/queries/maps';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { PersonalCapabilityCard } from './components';
import * as S from './units';

export const PersonalMapPage = () => {
    const [mapVariant, setMapVariant] = useState<MapVariant | IMapCriteria>(MapVariant.DEFAULT);
    const [chipsDisabled, setChipsDisabled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [params, setParams] = useSearchParams();
    const capabilityId = params.get('id');
    const { id } = useParams();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const navigate = useNavigate();

    const { data: mapData, isLoading: isLoadingMapData, error } = useGetPersonalMapByIdQuery(id);

    const { data: loadedTreeData, isLoading: isLoadingTreeData } = useGetMapDataQuery(
        capabilityId ? Number(capabilityId) : undefined,
        Boolean(capabilityId),
    );
    const capabilityTreeData = loadedTreeData as IMapItemData | undefined;
    const hasSubChildren =
        capabilityTreeData?.children?.some((child) => child.children.length !== 0) ?? false;

    const { data: childrenCapabilitiesData, isLoading: isLoadingChildrenCapabilities } =
        useGetChildrenCapabilitiesQuery({
            id: Number(capabilityId),
            enabled: Boolean(
                !!capabilityId && capabilityTreeData && !capabilityTreeData?.children.length,
            ),
        });

    const capabilityType = mapData?.type.name === 'TECH_CAPABILITY' ? 'tc' : 'bc';

    const { data: criteriasData, isLoading: isLoadingCriterias } =
        useGetMapCriteriasQuery(capabilityType);

    const isLoading =
        isLoadingMapData ||
        (capabilityId ? isLoadingTreeData : false) ||
        isLoadingChildrenCapabilities;

    useEffect(() => {
        if (
            childrenCapabilitiesData?.techCapabilities &&
            childrenCapabilitiesData.techCapabilities.length !== 0
        ) {
            setMapVariant(MapVariant.DEFAULT);
        } else {
            setChipsDisabled(false);
        }
    }, [childrenCapabilitiesData]);

    useEffect(() => {
        setIsExpanded(false);
    }, [capabilityId]);

    return (
        <S.PageWrapper>
            <S.Container>
                {!error && (
                    <S.InfoContainer>
                        {id && mapData && (
                            <Breadcrumbs>
                                {[
                                    <BreadCrumbsItem
                                        key={1}
                                        index={1}
                                        name="Мои карты"
                                        id={NaN}
                                        onClick={() =>
                                            navigate(`${R.MODELS_PATH}${R.MAP_PATH}?tab=PERSONAL`)
                                        }
                                    />,
                                    ...(capabilityId && mapData
                                        ? [
                                              <BreadCrumbsItem
                                                  key={2}
                                                  index={2}
                                                  name={mapData.name}
                                                  id={NaN}
                                                  onClick={() => setParams(new URLSearchParams({}))}
                                              />,
                                          ]
                                        : []),
                                ]}
                            </Breadcrumbs>
                        )}

                        <S.TitleContainer>
                            <S.Title>{capabilityTreeData?.name ?? mapData?.name}</S.Title>
                            {!capabilityId && (
                                <IconButton
                                    iconName={Icons.Link}
                                    size="large"
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(window.location.href);
                                        showSnackbar({ message: 'Ссылка скопирована' });
                                    }}
                                />
                            )}
                        </S.TitleContainer>

                        {id && !capabilityId && mapData && mapData.description && (
                            <S.Description
                                isExpanded
                                dangerouslySetInnerHTML={{
                                    __html: mapData.description,
                                }}
                            />
                        )}

                        {capabilityId && capabilityTreeData && capabilityTreeData.description && (
                            <S.Description
                                isExpanded={isExpanded}
                                dangerouslySetInnerHTML={{
                                    __html: capabilityTreeData.description,
                                }}
                            />
                        )}

                        {capabilityId && capabilityTreeData && !capabilityTreeData.description && (
                            <S.Description isExpanded>
                                Описания нет. Посмотреть детальную информацию по дочерним элементам
                                можно{' '}
                                <Link
                                    title="в древе ФДМ"
                                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capabilityTreeData.id}&type=BUSINESS`}
                                />
                            </S.Description>
                        )}
                        {capabilityId &&
                            capabilityTreeData &&
                            capabilityTreeData.description &&
                            isExpanded && (
                                <Text variant="body2">
                                    Посмотреть детальную информацию по дочерним элементам можно{' '}
                                    <Link
                                        title="в древе ФДМ"
                                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capabilityTreeData.id}&type=BUSINESS`}
                                    />
                                </Text>
                            )}

                        {capabilityId && capabilityTreeData && capabilityTreeData.description && (
                            <S.ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
                                <div>{isExpanded ? 'Скрыть' : 'Показать полностью'}</div>
                                <S.IconStyled
                                    iconName={isExpanded ? Icons.FastArrowTop : Icons.FastArrowDown}
                                    size="small"
                                />
                            </S.ExpandButton>
                        )}

                        <S.ChipsContainer>
                            {[
                                DEFAULT_MAP_CHIP,
                                ...(criteriasData ?? [])
                                    // @TODO: Хардкод, убрать filter с доработкой бэка
                                    .filter((criteria) =>
                                        capabilityType === 'tc'
                                            ? criteria.name !== 'Количество TC'
                                            : criteria.name !== 'Качество описания TC',
                                    )
                                    .map((criteria) => ({
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
                                                    (criteria) => criteria.id === chip.value,
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
                                {!capabilityId
                                    ? 'Группы'
                                    : childrenCapabilitiesData?.techCapabilities
                                    ? 'Технические возможности'
                                    : 'Бизнес-возможности'}
                            </S.Subtitle>
                            {mapVariant !== MapVariant.DEFAULT && (
                                <DynamicLegend criteria={mapVariant} />
                            )}
                        </S.SubtitleContainer>
                    </S.InfoContainer>
                )}

                {!isLoading && error && (
                    <S.ErrorContainer>
                        <NotFoundBlock imageVariant={ImageVariants.QUESTION_BOX} />
                    </S.ErrorContainer>
                )}

                {isLoading && (
                    <S.CardContainer>
                        <Skeleton radius={15} height={100} />
                        <Skeleton radius={15} height={100} />
                        <Skeleton radius={15} height={100} />
                    </S.CardContainer>
                )}
                {mapData && !isLoading && (!mapData.groups || mapData.groups.length === 0) && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Возможностей нет"
                            text=""
                        />
                    </S.NotFoundContainer>
                )}
                {capabilityId &&
                    capabilityTreeData &&
                    capabilityTreeData.children.length === 0 &&
                    childrenCapabilitiesData &&
                    childrenCapabilitiesData.techCapabilities.length === 0 && (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                imageVariant={ImageVariants.EMPTY_BOX}
                                title="Возможностей нет"
                                text=""
                            />
                        </S.NotFoundContainer>
                    )}
                {capabilityId && capabilityTreeData && !hasSubChildren && (
                    <S.CardGridContainer>
                        {capabilityTreeData.children.map((c) => (
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
                {capabilityId && capabilityTreeData && hasSubChildren && (
                    <S.CardContainer>
                        {capabilityTreeData.children?.map((child) => (
                            <CapabilityCard key={child.id} item={child} mapVariant={mapVariant} />
                        ))}
                    </S.CardContainer>
                )}
                {!capabilityId && mapData && mapData.groups && !isLoading && (
                    <S.CardContainer>
                        {mapData.groups.map((group) => (
                            <PersonalCapabilityCard
                                key={group.groupId}
                                mapType={mapData.type}
                                item={group}
                                mapVariant={mapVariant}
                            />
                        ))}
                    </S.CardContainer>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
