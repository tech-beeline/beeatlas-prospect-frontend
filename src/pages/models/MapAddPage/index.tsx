import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { CreateMapSideblock } from 'features/maps';
import { uniqueId } from 'lodash';

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
import { IPersonalMapElement, IPersonalMapGroup, PersonalMapElementType } from './types';
import * as S from './units';
import { deleteElementInMapDataByIds } from './utils';

export const MapAddPage = () => {
    const [draggedElement, setDraggedElement] = useState<IPersonalMapElement | null>(null);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [mapData, setMapData] = useState<IPersonalMapGroup[]>([]);

    const {
        modalOpened: sideblockOpened,
        openModal: openSideblock,
        closeModal: closeSideblock,
    } = useModal();

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${ROUTER.MODELS_PATH}${ROUTER.MAP_PATH}`);
    };

    const handleSave = () => {
        handleBackIconClick();
        showSnackbar({ message: 'Изменения сохранены' });
    };

    const nameRef = useRef<HTMLDivElement>(null);
    const showNameTooltip = useShowTooltip<HTMLDivElement>(nameRef);

    const descriptionRef = useRef<HTMLDivElement>(null);
    const showDescriptionTooltip = useShowTooltip<HTMLDivElement>(descriptionRef);

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
            setMapData(
                deleteElementInMapDataByIds(
                    [
                        ...mapData,
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
            setMapData(
                deleteElementInMapDataByIds(
                    [
                        ...mapData,
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
            const activeIndex = mapData.findIndex(
                ({ elementId }) => elementId === activeData.elementId,
            );
            const overIndex = mapData.findIndex(
                ({ elementId }) => elementId === overData.elementId,
            );
            setMapData(arrayMove(mapData, activeIndex, overIndex));
        } else if (
            overData.elementType === PersonalMapElementType.GROUP &&
            activeData.elementType === PersonalMapElementType.CAPABILITY
        ) {
            setMapData(
                deleteElementInMapDataByIds(
                    mapData.map((el) =>
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
            setMapData(
                deleteElementInMapDataByIds(
                    mapData.map((g) => ({
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
            const group = mapData.find((g) => g.elementId === overData.elementId);
            if (group) {
                setMapData(
                    deleteElementInMapDataByIds(
                        mapData.map((g) =>
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
            const group = mapData.find((g) =>
                g.children.some((c) => c.elementId === overData.elementId),
            );
            if (group) {
                setMapData(
                    deleteElementInMapDataByIds(
                        mapData.map((g) =>
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
                                    Ключевые возможности BSS
                                </S.Name>
                                {showNameTooltip && (
                                    <S.TooltipContainer id="name" offset={8} place="bottom" noArrow>
                                        Ключевые возможности BSS
                                    </S.TooltipContainer>
                                )}
                                <S.Desription data-tooltip-id="description" ref={descriptionRef}>
                                    Бизнес-возможности
                                </S.Desription>
                                {showDescriptionTooltip && (
                                    <S.TooltipContainer
                                        id="description"
                                        offset={8}
                                        place="bottom"
                                        noArrow
                                    >
                                        Бизнес-возможности
                                    </S.TooltipContainer>
                                )}
                            </div>

                            <S.ButtonStyled
                                endIcon={<Icon iconName={Icons.Edit} />}
                                onClick={openSideblock}
                            />
                        </S.FlexSideContainer>

                        <S.FlexSideContainer>
                            <Button onClick={() => navigate(-1)}>Закрыть</Button>

                            <Button variant="contained" onClick={handleSave}>
                                Сохранить
                            </Button>
                        </S.FlexSideContainer>
                    </S.Header>
                    <S.Content>
                        <CapabilitiesSideblock />
                        <CapabilitiesMapEdit
                            selectedElementId={selectedElementId}
                            setSelectedElementId={setSelectedElementId}
                            mapData={mapData}
                            setMapData={setMapData}
                            draggedElement={draggedElement}
                        />
                    </S.Content>
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
                typeDisabled
                isOpen={sideblockOpened}
                onClose={closeSideblock}
                values={{
                    name: 'Ключевые возможности BSS',
                    description: 'Бизнес-возможности',
                    type: 2,
                }}
            />
        </>
    );
};
