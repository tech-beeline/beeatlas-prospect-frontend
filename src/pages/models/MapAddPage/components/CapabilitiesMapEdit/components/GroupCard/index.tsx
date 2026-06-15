import React, { CSSProperties, FC } from 'react';
import {
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';

import { useModal } from 'hooks';
import {
    IPersonalMapCapability,
    IPersonalMapElement,
    IPersonalMapGroup,
    IPersonalMapSubgroup,
    PersonalMapElementType,
} from 'pages/models/MapAddPage/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IGroupCard, IGroupCardOverlay } from './types';
import * as S from './units';

const CapabilityCard: FC<{
    element: IPersonalMapCapability;
    selectedElementId: string | null;
    setSelectedElementId: (v: string | null) => void;
    draggedElement: IPersonalMapElement | null;
    withinSubgroup?: boolean;
}> = ({
    element,
    selectedElementId,
    setSelectedElementId,
    draggedElement,
    withinSubgroup = false,
}) => {
    const disabled =
        draggedElement?.elementType === PersonalMapElementType.GROUP ||
        !!(draggedElement && withinSubgroup);

    const { attributes, listeners, setNodeRef, node, transform, transition, isOver } = useSortable({
        id: `${element.elementType}-${element.elementId}`,
        data: element,
        disabled,
    });

    return (
        <S.CapabilityCard
            isOver={isOver}
            selected={selectedElementId === element.elementId}
            ref={disabled ? null : setNodeRef}
            style={{ transition, transform: CSS.Transform.toString(transform) }}
            {...attributes}
            {...listeners}
            onClick={(e) => {
                e.stopPropagation();
                if (node.current?.contains(e.target as any)) {
                    setSelectedElementId(
                        selectedElementId === element.elementId ? null : element.elementId,
                    );
                }
            }}
        >
            {element.name}
        </S.CapabilityCard>
    );
};

const CapabilityCardOverlay: FC<{
    element: IPersonalMapCapability;
}> = ({ element }) => {
    return (
        <S.CapabilityCard isOver={false} selected={false}>
            {element.name}
        </S.CapabilityCard>
    );
};

const SubgroupCard: FC<{
    element: IPersonalMapSubgroup;
    selectedElementId: string | null;
    setSelectedElementId: (v: string | null) => void;
    mapData: IPersonalMapGroup[];
    setMapData: (mapData: IPersonalMapGroup[]) => void;
    draggedElement: IPersonalMapElement | null;
}> = ({
    element,
    selectedElementId,
    setSelectedElementId,
    mapData,
    setMapData,
    draggedElement,
}) => {
    const disabled = draggedElement?.elementType === PersonalMapElementType.GROUP;

    const { attributes, listeners, setNodeRef, node, transform, transition, isOver } = useSortable({
        id: `${element.elementType}-${element.elementId}`,
        data: element,
        disabled,
    });

    const { openModal, closeModal, modalOpened } = useModal();

    const handleNameSubmit = (v: string) => {
        setMapData(
            mapData.map((g) => ({
                ...g,
                children: g.children.map((s) =>
                    s.elementId === element.elementId ? { ...s, name: v } : s,
                ),
            })),
        );
        closeModal();
    };

    return (
        <S.SubgroupCard
            selected={element.elementId === selectedElementId}
            isOver={isOver}
            ref={disabled ? null : setNodeRef}
            style={{ transition, transform: CSS.Transform.toString(transform) }}
            {...attributes}
            {...listeners}
            onClick={(e) => {
                // @TODO: fix this
                if ((e.target as any).className !== 'dsb_inline-edit-modal') {
                    e.stopPropagation();
                }
                if (node.current?.contains(e.target as any)) {
                    setSelectedElementId(
                        selectedElementId === element.elementId ? null : element.elementId,
                    );
                }
            }}
        >
            <S.InlineEditStyled
                open={modalOpened}
                onSubmit={(v) => handleNameSubmit(String(v))}
                onCancel={closeModal}
                value={element.name}
            >
                <S.TitleContainer>
                    <div>
                        <Text variant="subtitle2">{element.name}</Text>
                    </div>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            openModal();
                        }}
                        size="medium"
                        iconName={Icons.Edit}
                    />
                </S.TitleContainer>
            </S.InlineEditStyled>

            {element.children.map((capability) => (
                <CapabilityCard
                    withinSubgroup
                    key={capability.elementId}
                    element={capability}
                    selectedElementId={selectedElementId}
                    setSelectedElementId={setSelectedElementId}
                    draggedElement={draggedElement}
                />
            ))}
        </S.SubgroupCard>
    );
};

export const SubgroupCardOverlay: FC<{
    element: IPersonalMapSubgroup;
}> = ({ element }) => {
    return (
        <S.SubgroupCard isOver={false} selected={false}>
            <S.TitleContainer>
                <div>
                    <Text variant="subtitle2">{element.name}</Text>
                </div>
            </S.TitleContainer>

            {element.children.map((capability) => (
                <CapabilityCardOverlay key={capability.elementId} element={capability} />
            ))}
        </S.SubgroupCard>
    );
};

export const GroupCard: FC<IGroupCard> = ({
    group,
    mapData,
    setMapData,
    selectedElementId,
    setSelectedElementId,
    draggedElement,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        node,
        isOver: isOverDroppable,
        transform,
        isDragging,
        active,
    } = useSortable({
        id: `${group.elementType}-${group.elementId}`,
        data: group,
        strategy: horizontalListSortingStrategy,
    });

    const isOver =
        isOverDroppable &&
        (active?.data?.current?.elementType === PersonalMapElementType.CAPABILITY ||
            active?.data?.current?.elementType === PersonalMapElementType.SUBGROUP);

    const style: CSSProperties = {
        opacity: isDragging ? 0.4 : 1,
        transform: CSS.Translate.toString(transform),
    };

    const { openModal, closeModal, modalOpened } = useModal();

    const handleNameSubmit = (value: string) => {
        setMapData(
            mapData.map((mapEl) =>
                mapEl.elementId === group.elementId ? { ...group, name: value } : mapEl,
            ),
        );
        closeModal();
    };

    const hasSubgroups = group.children.some(
        (el) => el.elementType === PersonalMapElementType.SUBGROUP,
    );

    return (
        <SortableContext
            items={group.children.map((c) => c.elementId)}
            strategy={verticalListSortingStrategy}
        >
            <S.GroupCard
                hasSubgroups={hasSubgroups}
                selected={selectedElementId === group.elementId}
                onClick={(e) => {
                    if (node.current?.contains(e.target as any)) {
                        setSelectedElementId(
                            selectedElementId === group.elementId ? null : group.elementId,
                        );
                    }
                }}
                isOver={isOver}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={style}
            >
                <S.InlineEditStyled
                    open={modalOpened}
                    onSubmit={(v) => handleNameSubmit(String(v))}
                    onCancel={closeModal}
                    value={group.name}
                >
                    <S.TitleContainer>
                        <div>
                            <Text variant="subtitle2">{group.name}</Text>
                        </div>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                openModal();
                            }}
                            size="medium"
                            iconName={Icons.Edit}
                        />
                    </S.TitleContainer>
                </S.InlineEditStyled>

                {group.children.map((element) =>
                    element.elementType === PersonalMapElementType.CAPABILITY ? (
                        <CapabilityCard
                            key={element.elementId}
                            element={element}
                            setSelectedElementId={setSelectedElementId}
                            selectedElementId={selectedElementId}
                            draggedElement={draggedElement}
                        />
                    ) : (
                        <SubgroupCard
                            key={element.elementId}
                            element={element}
                            selectedElementId={selectedElementId}
                            setSelectedElementId={setSelectedElementId}
                            mapData={mapData}
                            setMapData={setMapData}
                            draggedElement={draggedElement}
                        />
                    ),
                )}
            </S.GroupCard>
        </SortableContext>
    );
};

export const GroupCardOverlay: FC<IGroupCardOverlay> = ({ element }) => {
    const hasSubgroups = element.children.some(
        (el) => el.elementType === PersonalMapElementType.SUBGROUP,
    );

    return (
        <S.GroupCard selected={false} isOver={false} hasSubgroups={hasSubgroups}>
            <S.TitleContainer>
                <div>
                    <Text variant="subtitle2">{element.name}</Text>
                </div>
            </S.TitleContainer>

            {element.children.map((element) =>
                element.elementType === PersonalMapElementType.CAPABILITY ? (
                    <CapabilityCardOverlay key={element.elementId} element={element} />
                ) : (
                    <SubgroupCardOverlay key={element.elementId} element={element} />
                ),
            )}
        </S.GroupCard>
    );
};
