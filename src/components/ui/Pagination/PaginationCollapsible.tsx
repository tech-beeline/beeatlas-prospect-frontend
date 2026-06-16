import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { PaginationCell } from './PaginationCell';
import type { PaginationCollapsibleProps } from './types';
import * as S from './units';
import { getFinish, getPage, getStart } from './utils';

const renderIcon = (icon: string) => (
    <S.IconGlyph className="beeline-icons dsb_icon dsb_icon--large" role="img" translate="no">
        {icon}
    </S.IconGlyph>
);

export const PaginationCollapsible: FC<PaginationCollapsibleProps> = ({
    count,
    siblingCount = 3,
    page = 1,
    onChange,
    className,
    ...props
}) => {
    const [currentPage, setCurrentPage] = useState(() => getPage(page, count));

    const setNewIndex = useCallback(
        (newIndex: number) => {
            if (newIndex === currentPage) {
                return;
            }

            setCurrentPage(newIndex);
            onChange?.(newIndex);
        },
        [currentPage, onChange],
    );

    const handleCellClick = useCallback(
        (newIndex: number) => {
            setNewIndex(newIndex);
        },
        [setNewIndex],
    );

    const siblingCells = useMemo(() => {
        const cells: React.ReactNode[] = [];
        const start = getStart(currentPage, count, siblingCount);
        const finish = getFinish(start, currentPage, count, siblingCount);

        if (!start || !finish) {
            return cells;
        }

        for (let i = start; i <= finish; i++) {
            const cellIndex = i;

            cells.push(
                <S.Item key={cellIndex}>
                    <PaginationCell
                        variant="text"
                        active={currentPage === cellIndex}
                        onClick={() => handleCellClick(cellIndex)}
                    >
                        {cellIndex}
                    </PaginationCell>
                </S.Item>,
            );
        }

        return cells;
    }, [currentPage, count, siblingCount, handleCellClick]);

    useEffect(() => {
        setCurrentPage(getPage(page, count));
    }, [page, count]);

    const handleDecreaseClick = useCallback(() => {
        const newIndex = currentPage - 1;

        if (newIndex >= 1) {
            setNewIndex(newIndex);
        }
    }, [currentPage, setNewIndex]);

    const handleIncreaseClick = useCallback(() => {
        const newIndex = currentPage + 1;

        if (newIndex <= count) {
            setNewIndex(newIndex);
        }
    }, [currentPage, count, setNewIndex]);

    const showDecreaseDots = currentPage > siblingCount + 1 && siblingCount + 3 < count;
    const showIncreaseDots = count - currentPage - 1 >= siblingCount && siblingCount + 3 < count;

    return (
        <S.Root
            data-testid="PaginationCollapsible"
            className={['dsb_pagination', 'dsb_pagination__collapsed', className]
                .filter(Boolean)
                .join(' ')}
            {...props}
        >
            <S.Item $first>
                <PaginationCell
                    variant="icon"
                    disabled={currentPage === 1}
                    startIcon={renderIcon(Icons.NavArrowLeft)}
                    onClick={handleDecreaseClick}
                    className="dsb_pagination-cell__first"
                />
            </S.Item>
            <S.Item>
                <PaginationCell
                    variant="text"
                    active={currentPage === 1}
                    onClick={() => handleCellClick(1)}
                    className="dsb_pagination-cell__first-cell"
                >
                    1
                </PaginationCell>
            </S.Item>
            {showDecreaseDots && (
                <S.Item>
                    <PaginationCell
                        variant="icon"
                        startIcon={renderIcon(Icons.MoreHoriz)}
                        className="dsb_pagination-cell__decrease-dots"
                    />
                </S.Item>
            )}
            {siblingCells}
            {showIncreaseDots && (
                <S.Item>
                    <PaginationCell
                        variant="icon"
                        startIcon={renderIcon(Icons.MoreHoriz)}
                        className="dsb_pagination-cell__increase-dots"
                    />
                </S.Item>
            )}
            {count > 1 && (
                <S.Item>
                    <PaginationCell
                        variant="text"
                        active={currentPage === count}
                        onClick={() => handleCellClick(count)}
                        className="dsb_pagination-cell__last-cell"
                    >
                        {count}
                    </PaginationCell>
                </S.Item>
            )}
            <S.Item>
                <PaginationCell
                    variant="icon"
                    disabled={currentPage === count}
                    startIcon={renderIcon(Icons.NavArrowRight)}
                    onClick={handleIncreaseClick}
                />
            </S.Item>
        </S.Root>
    );
};
