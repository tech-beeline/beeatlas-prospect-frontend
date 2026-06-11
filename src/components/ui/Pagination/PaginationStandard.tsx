import React, { FC, useCallback, useEffect, useState } from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { PaginationCell } from './PaginationCell';
import type { PaginationStandardProps } from './types';
import * as S from './units';
import { getPage } from './utils';

const renderIcon = (icon: string) => (
    <S.IconGlyph className="beeline-icons dsb_icon dsb_icon--large" role="img" translate="no">
        {icon}
    </S.IconGlyph>
);

export const PaginationStandard: FC<PaginationStandardProps> = ({
    count,
    onChange,
    page = 1,
    className,
    ...props
}) => {
    const [currentPage, setCurrentPage] = useState(() => getPage(page, count));

    useEffect(() => {
        setCurrentPage(getPage(page, count));
    }, [page, count]);

    const handleCellClick = useCallback(
        (cellIndex: number) => {
            if (cellIndex === currentPage) {
                return;
            }

            setCurrentPage(cellIndex);
            onChange?.(cellIndex);
        },
        [currentPage, onChange],
    );

    const handleLeftClick = () => {
        const newIndex = currentPage - 1;

        if (newIndex >= 1) {
            handleCellClick(newIndex);
        }
    };

    const handleRightClick = () => {
        const newIndex = currentPage + 1;

        if (newIndex <= count) {
            handleCellClick(newIndex);
        }
    };

    return (
        <S.Root
            data-testid="PaginationStandard"
            className={['dsb_pagination', className].filter(Boolean).join(' ')}
            {...props}
        >
            <S.Item $first>
                <PaginationCell
                    variant="icon"
                    disabled={currentPage === 1}
                    startIcon={renderIcon(Icons.NavArrowLeft)}
                    onClick={handleLeftClick}
                    className="dsb_pagination-cell__first"
                />
            </S.Item>
            {[...new Array(count).keys()].map((index) => {
                const cellIndex = index + 1;

                return (
                    <S.Item key={cellIndex}>
                        <PaginationCell
                            variant="text"
                            active={currentPage === cellIndex}
                            onClick={() => handleCellClick(cellIndex)}
                        >
                            {cellIndex}
                        </PaginationCell>
                    </S.Item>
                );
            })}
            <S.Item>
                <PaginationCell
                    variant="icon"
                    disabled={currentPage === count}
                    startIcon={renderIcon(Icons.NavArrowRight)}
                    onClick={handleRightClick}
                />
            </S.Item>
        </S.Root>
    );
};
