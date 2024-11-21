import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Chip, IconButton, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import {
    BreadCrumbsItem,
    CapabilityCard,
    CHIPS,
    MapVariant,
    ScenariosLegend,
    TechCapabilitiesLegend,
    TechCapabilityCard,
} from 'features/maps';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { IMapItemData } from 'api/capability/types';
import { useGetChildrenCapabilitiesQuery, useGetMapDataQuery } from 'api/queries/capability';
import { useGetPersonalMapByIdQuery } from 'api/queries/maps';
import * as ROUTER from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { PersonalCapabilityCard } from './components';
import * as S from './units';

export const PersonalMapPage = () => {
    const [mapVariant, setMapVariant] = useState(MapVariant.DEFAULT);
    const [chipsDisabled, setChipsDisabled] = useState(false);

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

    const isLoading = isLoadingMapData || isLoadingTreeData || isLoadingChildrenCapabilities;

    useEffect(() => {
        if (
            childrenCapabilitiesData?.techCapabilities &&
            childrenCapabilitiesData.techCapabilities.length !== 0
        ) {
            setMapVariant(MapVariant.DEFAULT);
            setChipsDisabled(true);
        } else {
            setChipsDisabled(false);
        }
    }, [childrenCapabilitiesData]);

    const Legend =
        mapVariant === MapVariant.E2E_SCENARIOS ? ScenariosLegend : TechCapabilitiesLegend;

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
                                            navigate(
                                                `${ROUTER.MODELS_PATH}${ROUTER.MAP_PATH}?tab=PERSONAL`,
                                            )
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

                        {id && mapData && mapData.description && (
                            <S.Description
                                isExpanded
                                dangerouslySetInnerHTML={{
                                    __html: capabilityTreeData?.description ?? mapData.description,
                                }}
                            />
                        )}

                        <S.ChipsContainer>
                            {CHIPS.map((chip, i) => (
                                <Chip
                                    key={i}
                                    disabled={
                                        (chipsDisabled && i !== 0) ||
                                        (mapData?.typeId === 1 && i === 1)
                                    }
                                    active={chip.value === mapVariant}
                                    label={chip.label}
                                    onClick={() => setMapVariant(chip.value)}
                                />
                            ))}
                        </S.ChipsContainer>

                        <S.SubtitleContainer>
                            <S.Subtitle>
                                {!capabilityId
                                    ? 'Группы'
                                    : childrenCapabilitiesData?.techCapabilities
                                    ? 'Технические возможности'
                                    : 'Бизнес-возможности'}
                            </S.Subtitle>
                            {mapVariant !== MapVariant.DEFAULT && <Legend />}
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
                {mapData && (!mapData.groups || mapData.groups.length === 0) && (
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
                                mapTypeId={mapData.typeId}
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
