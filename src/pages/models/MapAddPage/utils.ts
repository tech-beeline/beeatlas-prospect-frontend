import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep, uniqueId } from 'lodash';

import { NEW_GROUP_DROPPABLE_ID } from './const';
import { IPersonalMapElement, IPersonalMapGroup, PersonalMapElementType } from './types';

export const deleteElementInMapDataByIds = (
    mapData: IPersonalMapGroup[],
    ids: string[],
): IPersonalMapGroup[] => {
    const deepCopy = cloneDeep(mapData);

    return deepCopy
        .filter((element) => !ids.includes(element.elementId))
        .map((element) => ({
            ...element,
            ...(element.children
                ? { children: deleteElementInMapDataByIds(element.children as [], ids) }
                : {}),
        })) as IPersonalMapGroup[];
};

export const handleDragEnd = (
    e: DragEndEvent,
    groupsData: IPersonalMapGroup[],
    setDraggedElement: (element: null) => void,
    setGroupsData: (groups: IPersonalMapGroup[]) => void,
): void => {
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
        const overIndex = groupsData.findIndex(({ elementId }) => elementId === overData.elementId);
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
