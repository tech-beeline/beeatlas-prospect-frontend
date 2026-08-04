import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    DndContext,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { CreateMapSideblock, MapFormValues } from 'features/maps';
import { uniqueId } from 'lodash';

import { TooltipContainer } from 'components/interaction';
import { Button, Icon } from 'components/ui';

import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import { PersonalMapTypes } from 'api/maps/types';
import {
    useGetPersonalMapByIdQuery,
    useUpdatePersonalMapGroupsMutation,
    useUpdatePersonalMapMutation,
} from 'api/queries/maps';
import { useModal, useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    GroupCardOverlay,
    SubgroupCardOverlay,
} from './components/CapabilitiesMapEdit/components/GroupCard';
import { CapabilitiesSearchCardOverlay } from './components/CapabilitiesSideblock/components';
import { CapabilitiesMapEdit, CapabilitiesSideblock } from './components';
import {
    IPersonalMapCapability,
    IPersonalMapElement,
    IPersonalMapGroup,
    IPersonalMapSubgroup,
    PersonalMapElementType,
} from './types';
import * as S from './units';
import { handleDragEnd } from './utils';

export const MapAddPage = () => {
    const [draggedElement, setDraggedElement] = useState<IPersonalMapElement | null>(null);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const [groupsData, setGroupsData] = useState<IPersonalMapGroup[]>([]);

    const selectedCapabilitiesIds = groupsData.reduce(
        (acc, g) => [
            ...acc,
            ...g.children
                .map((child) =>
                    child.elementType === PersonalMapElementType.CAPABILITY
                        ? [child.id]
                        : child.children.map((c) => c.id),
                )
                .flat(),
        ],
        [] as number[],
    );

    const { mutateAsync: updatePersonalMap } = useUpdatePersonalMapMutation();
    const { mutateAsync: updatePersonalMapGroups } = useUpdatePersonalMapGroupsMutation();
    const { data: mapData } = useGetPersonalMapByIdQuery(paramId);

    useEffect(() => {
        if (mapData?.groups) {
            setGroupsData(
                mapData.groups.map((g) => ({
                    name: g.nameGroup,
                    groupId: g.groupId,
                    elementId: uniqueId(),
                    elementType: PersonalMapElementType.GROUP,
                    children: [
                        ...(g.capability ?? []).map((c) => ({
                            id: c.id,
                            code: c.code,
                            description: c.description,
                            name: c.name,
                            type:
                                mapData.type.name === PersonalMapTypes.TECH_CAPABILITY
                                    ? CapabilitySearchResultTypeVariant.TECH_CAPABILITY
                                    : CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY,
                            elementType:
                                PersonalMapElementType.CAPABILITY as PersonalMapElementType.CAPABILITY,
                            elementId: uniqueId(),
                        })),
                        ...(g.childrenGroup ?? []).map((c) => ({
                            name: c.nameGroup,
                            groupId: c.groupId,
                            children: (c.capability ?? []).map((c) => ({
                                id: c.id,
                                code: c.code,
                                description: c.description,
                                name: c.name,
                                type:
                                    mapData.type.name === PersonalMapTypes.TECH_CAPABILITY
                                        ? CapabilitySearchResultTypeVariant.TECH_CAPABILITY
                                        : CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY,
                                elementType:
                                    PersonalMapElementType.CAPABILITY as PersonalMapElementType.CAPABILITY,
                                elementId: uniqueId(),
                            })),
                            elementType:
                                PersonalMapElementType.SUBGROUP as PersonalMapElementType.SUBGROUP,
                            elementId: uniqueId(),
                        })),
                    ],
                })),
            );
        }
    }, [mapData]);

    const {
        modalOpened: sideblockOpened,
        openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    const handleSideblockSave = async (values: MapFormValues) => {
        if (paramId) {
            await updatePersonalMap({
                id: paramId,
                data: {
                    name: values.name,
                    description: values.description,
                    type: { id: values.type },
                },
            });
            closeSideblock();
        }
    };

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${R.MODELS_PATH}${R.MAP_PATH}?tab=PERSONAL`);
    };

    const handleSave = async () => {
        if (paramId) {
            await updatePersonalMapGroups({
                id: paramId,
                data: groupsData.map((g) => ({
                    nameGroup: g.name,
                    groupId: g.groupId,
                    capabilityIds: g.children
                        .filter((c) => c.elementType === PersonalMapElementType.CAPABILITY)
                        .map((c) => (c as IPersonalMapCapability).id),
                    childrenGroups: g.children
                        .filter((c) => c.elementType === PersonalMapElementType.SUBGROUP)
                        .map((c) => ({
                            nameGroup: c.name,
                            groupId: (c as IPersonalMapSubgroup).groupId,
                            capabilityId: (c as IPersonalMapSubgroup).children.map((c) => c.id),
                        })),
                })),
            });
            handleBackIconClick();
            showSnackbar({ message: 'Изменения сохранены' });
        }
    };

    const nameRef = useRef<HTMLDivElement>(null);
    const showNameTooltip = useShowTooltip<HTMLDivElement>(nameRef);

    const handleDragStart = (e: DragStartEvent) => {
        setDraggedElement(e.active.data.current as IPersonalMapElement);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const hasSavedCapabilities =
        mapData && ((mapData.groups && mapData.groups.length !== 0) || mapData.groups !== null);

    return (
        <>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={(e) => handleDragEnd(e, groupsData, setDraggedElement, setGroupsData)}
                onDragCancel={() => setDraggedElement(null)}
                sensors={sensors}
            >
                <S.PageWrapper>
                    <S.Header>
                        <S.FlexSideContainer>
                            <div>
                                <S.Name data-tooltip-id="name" ref={nameRef}>
                                    {mapData?.name}
                                </S.Name>
                                {showNameTooltip && (
                                    <TooltipContainer
                                        largePadding
                                        id="name"
                                        offset={8}
                                        place="bottom"
                                        noArrow
                                    >
                                        {mapData?.name}
                                    </TooltipContainer>
                                )}
                                <S.Desription>{mapData?.type.title}</S.Desription>
                            </div>

                            <S.ButtonStyled
                                endIcon={<Icon iconName={Icons.Edit} />}
                                onClick={openSideblock}
                                disabled={!mapData}
                            />
                        </S.FlexSideContainer>

                        <S.FlexSideContainer>
                            <Button
                                onClick={() =>
                                    navigate(`${R.MODELS_PATH}${R.MAP_PATH}?tab=PERSONAL`)
                                }
                            >
                                Закрыть
                            </Button>

                            <Button variant="contained" onClick={handleSave}>
                                Сохранить
                            </Button>
                        </S.FlexSideContainer>
                    </S.Header>
                    {mapData && (
                        <S.Content>
                            <CapabilitiesSideblock
                                mapType={mapData.type}
                                selectedCapabilitiesIds={selectedCapabilitiesIds}
                            />
                            <CapabilitiesMapEdit
                                selectedElementId={selectedElementId}
                                setSelectedElementId={setSelectedElementId}
                                mapData={groupsData}
                                setMapData={setGroupsData}
                                draggedElement={draggedElement}
                            />
                        </S.Content>
                    )}
                    <DragOverlay dropAnimation={null}>
                        {draggedElement?.elementType === PersonalMapElementType.CAPABILITY && (
                            <CapabilitiesSearchCardOverlay capability={draggedElement} />
                        )}
                        {draggedElement?.elementType === PersonalMapElementType.SUBGROUP && (
                            <SubgroupCardOverlay element={draggedElement} />
                        )}
                        {draggedElement?.elementType === PersonalMapElementType.GROUP && (
                            <GroupCardOverlay element={draggedElement} />
                        )}
                    </DragOverlay>
                </S.PageWrapper>
            </DndContext>
            <CreateMapSideblock
                typeDisabled={hasSavedCapabilities || groupsData.length !== 0}
                isOpen={sideblockOpened}
                onClose={closeSideblock}
                onSave={handleSideblockSave}
                values={mapData ? { ...mapData, type: mapData.type.id } : undefined}
            />
        </>
    );
};
