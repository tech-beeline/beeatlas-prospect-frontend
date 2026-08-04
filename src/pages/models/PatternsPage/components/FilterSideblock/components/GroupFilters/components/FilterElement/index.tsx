import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Checkbox } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { SideblockView } from '../../../../const';

import { IFilterElement } from './types';
import * as S from './units';
import { getIdsRecursively } from './utils';

export const FilterElement: FC<IFilterElement> = ({
    parentId,
    filterElement,
    level = 0,
    isAdmin,
    setSideblockView,
    setGroupToDelete,
    setGroupToEdit,
    onSelect,
    selectedGroups,
}) => {
    const [expanded, setExpanded] = useState(false);
    const isChecked = selectedGroups.includes(filterElement.id);

    return (
        <>
            <S.Container level={level}>
                <S.TitleContainer>
                    <S.IconButtonContainer>
                        {filterElement.children.length > 0 && (
                            <IconButton
                                iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                size="medium"
                                onClick={() => setExpanded(!expanded)}
                            />
                        )}
                    </S.IconButtonContainer>
                    <Checkbox
                        checked={isChecked}
                        onChange={(e) =>
                            onSelect(getIdsRecursively(filterElement), e.target.checked)
                        }
                    />
                    <Text variant="body3">{filterElement.name}</Text>
                </S.TitleContainer>
                {isAdmin && (
                    <S.ActionsContainer>
                        <IconButton
                            size="small"
                            iconName={Icons.Edit}
                            onClick={() => {
                                setGroupToEdit({ ...filterElement, parentId });
                                setSideblockView(SideblockView.FORM);
                            }}
                        />
                        <IconButton
                            size="small"
                            iconName={Icons.Delete}
                            onClick={() => setGroupToDelete(filterElement)}
                        />
                    </S.ActionsContainer>
                )}
            </S.Container>
            {expanded && (
                <>
                    {filterElement.children.map((element) => (
                        <FilterElement
                            key={element.id}
                            parentId={filterElement.id}
                            isAdmin={isAdmin}
                            filterElement={element}
                            level={level + 1}
                            setSideblockView={setSideblockView}
                            setGroupToDelete={setGroupToDelete}
                            setGroupToEdit={setGroupToEdit}
                            onSelect={onSelect}
                            selectedGroups={selectedGroups}
                        />
                    ))}
                </>
            )}
        </>
    );
};
