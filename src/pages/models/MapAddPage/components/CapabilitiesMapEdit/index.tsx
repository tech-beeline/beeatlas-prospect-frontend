import React, { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { uniqueId } from 'lodash';

import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { NEW_GROUP_DROPPABLE_ID } from '../../const';
import { PersonalMapElementType } from '../../types';
import { deleteElementInMapDataByIds } from '../../utils';

import { GroupCard } from './components';
import { ICapabilitiesGroupEdit } from './types';
import * as S from './units';

export const CapabilitiesMapEdit: FC<ICapabilitiesGroupEdit> = ({
    mapData,
    setMapData,
    selectedElementId,
    setSelectedElementId,
    draggedElement,
}) => {
    const {
        setNodeRef,
        isOver: isOverDroppable,
        active,
    } = useDroppable({ id: NEW_GROUP_DROPPABLE_ID });

    const isOver =
        isOverDroppable &&
        (active?.data?.current?.elementType === PersonalMapElementType.CAPABILITY ||
            active?.data?.current?.elementType === PersonalMapElementType.SUBGROUP);

    const handleAddGroupButtonClick = () => {
        setMapData([
            ...mapData,
            {
                elementId: uniqueId(),
                elementType: PersonalMapElementType.GROUP,
                name: 'Укажите название группы',
                children: [],
            },
        ]);
    };

    const handleDeleteButtonClick = () => {
        if (selectedElementId) {
            setMapData(deleteElementInMapDataByIds(mapData, [selectedElementId]));
            setSelectedElementId(null);
        }
    };

    return (
        <S.Container>
            <S.ButtonsContainer>
                <Button
                    disabled={!selectedElementId}
                    onClick={handleDeleteButtonClick}
                    startIcon={<Icon iconName={Icons.Delete} />}
                >
                    Удалить
                </Button>
                <Button
                    onClick={handleAddGroupButtonClick}
                    startIcon={<Icon iconName={Icons.Add} />}
                >
                    Добавить группу
                </Button>
            </S.ButtonsContainer>

            <S.GroupContainer>
                <SortableContext
                    items={mapData.map((group) => `${group.elementType}-${group.elementId}`)}
                    strategy={horizontalListSortingStrategy}
                >
                    {mapData.map((group) => (
                        <GroupCard
                            key={group.elementId}
                            group={group}
                            mapData={mapData}
                            setMapData={setMapData}
                            selectedElementId={selectedElementId}
                            setSelectedElementId={setSelectedElementId}
                            draggedElement={draggedElement}
                        />
                    ))}
                </SortableContext>
                <S.DropdownArea column={mapData.length !== 0} isOver={isOver} ref={setNodeRef}>
                    {isOver ? 'Отпуcтите' : 'Перетащите возможность сюда'}
                </S.DropdownArea>
            </S.GroupContainer>
        </S.Container>
    );
};
