import React, { FC, isValidElement, useMemo } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { DEFAULT_ITEM, DEFAULT_MAX_INDEX, DEFAULT_MIN_INDEX } from './const';
import type { RatingItemType, RatingProps } from './types';
import * as S from './units';
import { useRating } from './useRating';
import { createItemIndices, isNumberItem, isStarItem, isStarSelected } from './utils';

const renderItem = (
    item: RatingItemType,
    index: number,
    value: number | undefined,
    hoverIndex: number | null,
) => {
    if (isStarItem(item)) {
        const selected = isStarSelected(index, value, hoverIndex);

        return (
            <S.StarIcon
                className={[
                    'dsb_icon',
                    'dsb_icon--large',
                    'dsb_rating__select__item-star',
                    selected && 'dsb_rating__select__item-star-selected',
                ]
                    .filter(Boolean)
                    .join(' ')}
                translate="no"
                aria-hidden="true"
                $selected={selected}
            >
                {selected ? Icons.StarFull : Icons.Star}
            </S.StarIcon>
        );
    }

    if (isNumberItem(item)) {
        const selected = value === index;

        return (
            <S.NumberItem
                className={[
                    'dsb_rating__select__item-number',
                    selected && 'dsb_rating__select__item-number-selected',
                ]
                    .filter(Boolean)
                    .join(' ')}
                $selected={selected}
            >
                <S.NumberText className="dsb_typography" $selected={selected}>
                    {index}
                </S.NumberText>
            </S.NumberItem>
        );
    }

    if (typeof item === 'function') {
        return item(index);
    }

    return null;
};

export const Rating: FC<RatingProps> = ({
    item = DEFAULT_ITEM,
    minIndex = DEFAULT_MIN_INDEX,
    maxIndex = DEFAULT_MAX_INDEX,
    onChange,
    onHover,
    value,
    caption,
    score,
    className,
    disabled,
    readonly,
    dataTestId = 'Rating',
    ...props
}) => {
    const { hoverIndex, handleMouseLeave, handleMouseEnter } = useRating({ onHover });

    const indices = useMemo(() => createItemIndices(minIndex, maxIndex), [minIndex, maxIndex]);

    const rootClassName = [
        'dsb_rating',
        className,
        disabled && 'dsb_rating-disabled',
        readonly && 'dsb_rating-readonly',
    ]
        .filter(Boolean)
        .join(' ');

    const selectClassName = [
        'dsb_rating__select',
        isStarItem(item) && 'dsb_rating__select-star',
        isNumberItem(item) && 'dsb_rating__select-number',
    ]
        .filter(Boolean)
        .join(' ');

    const handleItemKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!onChange) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onChange(index);
        }
    };

    return (
        <S.Root
            data-testid={dataTestId}
            className={rootClassName}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {score && (
                <S.Score className="dsb_rating__score">
                    {isValidElement(score) ? (
                        score
                    ) : (
                        <S.ScoreText className="dsb_typography dsb_rating__score-text">
                            {score}
                        </S.ScoreText>
                    )}
                </S.Score>
            )}

            <S.Select className={selectClassName}>
                {indices.map((index) => (
                    <S.SelectItem
                        key={index}
                        role="button"
                        tabIndex={onChange ? 0 : undefined}
                        className="dsb_rating__select__item"
                        onClick={() => onChange?.(index)}
                        onKeyDown={handleItemKeyDown(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        {renderItem(item, index, value, hoverIndex)}
                    </S.SelectItem>
                ))}
            </S.Select>

            {caption && (
                <S.Caption className="dsb_rating__caption">
                    <S.CaptionText className="dsb_typography dsb_rating__caption-left">
                        {caption.left}
                    </S.CaptionText>
                    <S.CaptionText className="dsb_typography dsb_rating__caption-right">
                        {caption.right}
                    </S.CaptionText>
                </S.Caption>
            )}
        </S.Root>
    );
};

Rating.displayName = 'Rating';
