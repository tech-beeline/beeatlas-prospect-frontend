import React, { FC, useState } from 'react';
import { Checkbox, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { SideblockView } from '../../../../const';

import { IFilterElement } from './types';
import * as S from './units';

export const FilterElement: FC<IFilterElement> = ({
    parentId,
    filterElement,
    level = 0,
    isAdmin,
    setSideblockView,
    setGroupToDelete,
    setGroupToEdit,
}) => {
    const [expanded, setExpanded] = useState(false);

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
                    <Checkbox />
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
                        />
                    ))}
                </>
            )}
        </>
    );
};
