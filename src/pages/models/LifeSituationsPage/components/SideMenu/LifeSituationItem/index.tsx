import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { ItemTypes } from '../../../types';

import { ILifeSituationItem } from './types';
import * as S from './units';

export const LifeSituationItem: FC<ILifeSituationItem> = ({ item, activeItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [, setParams] = useSearchParams();

    useEffect(() => {
        if (activeItem && activeItem.type === ItemTypes.NFR && activeItem.chapterId === item.id) {
            setIsExpanded(true);
        }
    }, [activeItem, item.id]);

    return (
        <>
            <S.Container
                selected={
                    !!activeItem &&
                    activeItem.type === ItemTypes.CHAPTER &&
                    activeItem.id === item.id
                }
                onClick={() => setParams(new URLSearchParams({ chapterId: String(item.id) }))}
            >
                <S.IconButtonContainer>
                    {item.nfr.length > 0 && (
                        <IconButton
                            size="medium"
                            iconName={isExpanded ? Icons.NavArrowDown : Icons.NavArrowRight}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded((prev) => !prev);
                            }}
                        />
                    )}
                </S.IconButtonContainer>
                <S.Title>{item.name}</S.Title>
            </S.Container>
            {isExpanded && (
                <>
                    {item.nfr.map((nfr) => (
                        <S.ChildContainer
                            key={nfr.id}
                            selected={
                                !!activeItem &&
                                activeItem.type === ItemTypes.NFR &&
                                activeItem.chapterId === item.id &&
                                activeItem.id === Number(nfr.id)
                            }
                            onClick={() =>
                                setParams(
                                    new URLSearchParams({
                                        chapterId: String(item.id),
                                        nfrId: String(nfr.id),
                                    }),
                                )
                            }
                        >
                            {nfr.name}
                        </S.ChildContainer>
                    ))}
                </>
            )}
        </>
    );
};
