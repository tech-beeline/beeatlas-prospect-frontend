import React, { FC, useRef } from 'react';

import { Text } from 'components/core';
import { Chip, IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { CHIPS_SCROLL_STEP } from './const';
import { IImplementationChips } from './types';
import * as S from './units';

export const ImplementationChips: FC<IImplementationChips> = ({
    implementations,
    selectedId,
    onSelect,
}) => {
    const chipsRef = useRef<HTMLDivElement>(null);

    if (implementations.length <= 1) return null;

    const scroll = (direction: number) =>
        chipsRef.current?.scrollBy({ left: direction * CHIPS_SCROLL_STEP, behavior: 'smooth' });

    return (
        <S.Container>
            <Text inactive variant="overline">
                Реализация
            </Text>
            <S.Row>
                <IconButton
                    size="medium"
                    iconName={Icons.NavArrowLeft}
                    onClick={() => scroll(-1)}
                />
                <S.Chips ref={chipsRef}>
                    {implementations.map((implementation) => (
                        <Chip
                            key={implementation.id}
                            label={implementation.label}
                            active={selectedId === implementation.id}
                            onClick={() => onSelect(implementation.id)}
                        />
                    ))}
                </S.Chips>
                <IconButton
                    size="medium"
                    iconName={Icons.NavArrowRight}
                    onClick={() => scroll(1)}
                />
            </S.Row>
        </S.Container>
    );
};
