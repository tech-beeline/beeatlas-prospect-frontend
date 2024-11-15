import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { CreateMapSideblock, MapFormValues } from 'features/maps';
import { mapTypeToNameMap } from 'features/maps/components/CreateMapSideblock/const';
import { uniqueId } from 'lodash';

import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import {
    useGetPersonalMapByIdQuery,
    useGetPersonalMapTypesQuery,
    useUpdatePersonalMapGroupsMutation,
    useUpdatePersonalMapMutation,
} from 'api/queries/maps';
import { useModal, useShowTooltip } from 'hooks';
import * as ROUTER from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    GroupCardOverlay,
    SubgroupCardOverlay,
} from './components/CapabilitiesMapEdit/components/GroupCard';
import { CapabilitiesSearchCardOverlay } from './components/CapabilitiesSideblock/components';
import { CapabilitiesMapEdit, CapabilitiesSideblock } from './components';
import { NEW_GROUP_DROPPABLE_ID } from './const';
import {
    IPersonalMapCapability,
    IPersonalMapElement,
    IPersonalMapGroup,
    IPersonalMapSubgroup,
    PersonalMapElementType,
} from './types';
import * as S from './units';
import { deleteElementInMapDataByIds } from './utils';

export const MapAddPage = () => {
    const [draggedElement, setDraggedElement] = useState<IPersonalMapElement | null>(null);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const [groupsData, setGroupsData] = useState<IPersonalMapGroup[]>([]);

    const { mutateAsync: updatePersonalMap } = useUpdatePersonalMapMutation();
    const { mutateAsync: updatePersonalMapGroups } = useUpdatePersonalMapGroupsMutation();
    const { data: mapData } = useGetPersonalMapByIdQuery(paramId);
    const { data: typesData } = useGetPersonalMapTypesQuery();

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
                                mapData.typeId === 1
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
                                    mapData.typeId === 1
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
            await updatePersonalMap({ id: paramId, data: { ...values, typeId: values.type } });
            closeSideblock();
        }
    };

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${ROUTER.MODELS_PATH}${ROUTER.MAP_PATH}?tab=PERSONAL`);
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

    const handleDragEnd = (e: DragEndEvent) => {
        if (!e.over || e.over.id === e.active.id) {
            setDraggedElement(null);
            return;
        }

        const overData = e.over.data.current as IPersonalMapElement;
        const activeData = e.active.data.current as IPersonalMapElement;

        if (
            e.over.id === NEW_GROUP_DROPPABLE_ID &&
            activeData.elementType === PersonalMapElementType.CAPABILITY
        ) {
            setGroupsData(
                deleteElementInMapDataByIds(
                    [
                        ...groupsData,
                        {
                            elementId: uniqueId(),
                            elementType: PersonalMapElementType.GROUP,
                            name: 'Укажите название группы',
                            children: [
                                {
                                    ...activeData,
                                    elementType: PersonalMapElementType.CAPABILITY,
                                    elementId: uniqueId(),
                                },
                            ],
                        },
                    ],
                    [activeData.elementId],
                ),
            );
        } else if (
            e.over.id === NEW_GROUP_DROPPABLE_ID &&
            activeData.elementType === PersonalMapElementType.SUBGROUP
        ) {
            setGroupsData(
                deleteElementInMapDataByIds(
                    [
                        ...groupsData,
                        {
                            elementId: uniqueId(),
                            elementType: PersonalMapElementType.GROUP,
                            name: 'Укажите название группы',
                            children: [
                                {
                                    ...activeData,
                                    elementType: PersonalMapElementType.SUBGROUP,
                                    elementId: uniqueId(),
                                },
                            ],
                        },
                    ],
                    [activeData.elementId],
                ),
            );
        } else if (
            overData.elementType === PersonalMapElementType.GROUP &&
            activeData.elementType === PersonalMapElementType.GROUP
        ) {
            const activeIndex = groupsData.findIndex(
                ({ elementId }) => elementId === activeData.elementId,
            );
            const overIndex = groupsData.findIndex(
                ({ elementId }) => elementId === overData.elementId,
            );
            setGroupsData(arrayMove(groupsData, activeIndex, overIndex));
        } else if (
            overData.elementType === PersonalMapElementType.GROUP &&
            activeData.elementType === PersonalMapElementType.CAPABILITY
        ) {
            setGroupsData(
                deleteElementInMapDataByIds(
                    groupsData.map((el) =>
                        el.elementId === overData.elementId
                            ? {
                                  ...overData,
                                  children: [
                                      ...overData.children,
                                      {
                                          ...activeData,
                                          elementId: uniqueId(),
                                          elementType: PersonalMapElementType.CAPABILITY,
                                      },
                                  ],
                              }
                            : el,
                    ),
                    [activeData.elementId],
                ),
            );
        } else if (
            overData.elementType === PersonalMapElementType.SUBGROUP &&
            activeData.elementType === PersonalMapElementType.CAPABILITY
        ) {
            setGroupsData(
                deleteElementInMapDataByIds(
                    groupsData.map((g) => ({
                        ...g,
                        children: g.children.map((s) =>
                            s.elementId === overData.elementId &&
                            s.elementType === PersonalMapElementType.SUBGROUP
                                ? {
                                      ...s,
                                      children: [
                                          ...s.children,
                                          { ...activeData, elementId: uniqueId() },
                                      ],
                                  }
                                : s,
                        ),
                    })),
                    [activeData.elementId],
                ),
            );
        } else if (
            overData.elementType === PersonalMapElementType.GROUP &&
            activeData.elementType === PersonalMapElementType.SUBGROUP
        ) {
            const group = groupsData.find((g) => g.elementId === overData.elementId);
            if (group) {
                setGroupsData(
                    deleteElementInMapDataByIds(
                        groupsData.map((g) =>
                            g.elementId === group.elementId
                                ? {
                                      ...group,
                                      children: [
                                          ...group.children,
                                          { ...activeData, elementId: uniqueId() },
                                      ],
                                  }
                                : g,
                        ),
                        [activeData.elementId],
                    ),
                );
            }
        } else if (
            overData.elementType === PersonalMapElementType.CAPABILITY &&
            activeData.elementType === PersonalMapElementType.CAPABILITY
        ) {
            const group = groupsData.find((g) =>
                g.children.some((c) => c.elementId === overData.elementId),
            );
            if (group) {
                setGroupsData(
                    deleteElementInMapDataByIds(
                        groupsData.map((g) =>
                            g.elementId === group.elementId
                                ? {
                                      ...group,
                                      children: [
                                          ...group.children,
                                          {
                                              elementId: uniqueId(),
                                              elementType: PersonalMapElementType.SUBGROUP,
                                              name: 'Укажите название группы',
                                              children: [
                                                  { ...activeData, elementId: uniqueId() },
                                                  { ...overData, elementId: uniqueId() },
                                              ],
                                          },
                                      ],
                                  }
                                : g,
                        ),
                        [activeData.elementId, overData.elementId],
                    ),
                );
            }
        }

        setDraggedElement(null);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    return (
        <>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
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
                                    <S.TooltipContainer id="name" offset={8} place="bottom" noArrow>
                                        {mapData?.name}
                                    </S.TooltipContainer>
                                )}
                                <S.Desription data-tooltip-id="description">
                                    {mapTypeToNameMap[
                                        typesData?.find((type) => type.id === mapData?.typeId)
                                            ?.name ?? ''
                                    ] ?? mapData?.typeId}
                                </S.Desription>
                            </div>

                            <S.ButtonStyled
                                endIcon={<Icon iconName={Icons.Edit} />}
                                onClick={openSideblock}
                            />
                        </S.FlexSideContainer>

                        <S.FlexSideContainer>
                            <Button
                                onClick={() =>
                                    navigate(`${ROUTER.MODELS_PATH}${ROUTER.MAP_PATH}?tab=PERSONAL`)
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
                            <CapabilitiesSideblock mapTypeId={mapData.typeId} />
                            <CapabilitiesMapEdit
                                selectedElementId={selectedElementId}
                                setSelectedElementId={setSelectedElementId}
                                mapData={groupsData}
                                setMapData={setGroupsData}
                                draggedElement={draggedElement}
                            />
                        </S.Content>
                    )}
                </S.PageWrapper>
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
            </DndContext>
            <CreateMapSideblock
                typeDisabled={groupsData.length !== 0}
                isOpen={sideblockOpened}
                onClose={closeSideblock}
                onSave={handleSideblockSave}
                values={mapData ? { ...mapData, type: mapData.typeId } : undefined}
            />
        </>
    );
};
