import React, { FC } from 'react';

import { Skeleton } from 'components/ui';

import { SkeletonTableProps } from './types';
import * as S from './units';

export const SkeletonTable: FC<SkeletonTableProps> = ({
    firstColumnRows,
    otherColumnsRows,
    columns,
}) => {
    const otherColumnsCount = columns - 1;

    return (
        <S.TableStyled>
            <thead>
                <tr>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <S.ThStyled key={`header-col-${colIndex}`}>
                            <Skeleton width="100%" height={40} variant="square" />
                        </S.ThStyled>
                    ))}
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: firstColumnRows }).map((_, rowIndex) => {
                    return (
                        <tr key={`row-${rowIndex}`}>
                            <S.TdStyled>
                                <Skeleton width="100%" height={18} variant="square" />
                            </S.TdStyled>

                            {rowIndex < otherColumnsRows
                                ? Array.from({ length: otherColumnsCount }).map((_, colIndex) => (
                                      <S.TdStyled key={`cell-${rowIndex}-${colIndex}`}>
                                          <Skeleton width="100%" height={18} variant="square" />
                                      </S.TdStyled>
                                  ))
                                : Array.from({ length: otherColumnsCount }).map((_, colIndex) => (
                                      <S.TdStyled key={`empty-${rowIndex}-${colIndex}`} />
                                  ))}
                        </tr>
                    );
                })}
            </tbody>
        </S.TableStyled>
    );
};
