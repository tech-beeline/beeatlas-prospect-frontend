import React, { FC } from 'react';
import dayjs from 'dayjs';
import { useThemeStore } from 'features/theme';

import { OverflowList } from 'components/containers';
import { Link } from 'components/other';
import { Label, TableData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import * as S from '../../units';

import { IPatternsRow } from './types';

export const PatternsRow: FC<IPatternsRow> = ({ pattern }) => {
    const themeIsDark = useThemeStore((state) => state.themeIsDark);
    return (
        <TableRow>
            <TableData>
                <Link
                    title={pattern.name}
                    url={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${pattern.id}`}
                />
            </TableData>
            <TableData>
                <Label
                    title={pattern.isAntiPattern ? 'Антипаттерн' : 'Паттерн'}
                    variant="contained"
                    type={pattern.isAntiPattern ? 'error' : 'success'}
                />
            </TableData>

            <S.TechnologiesColumnData>
                {pattern.technologies ? (
                    <OverflowList
                        commaSeparated
                        items={pattern.technologies}
                        renderItem={(tech) => (
                            <Link
                                outer={true}
                                title={tech.label}
                                url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=${tech.id}`}
                            />
                        )}
                        renderOverflowPopover={(hiddenTechnologies) => (
                            <S.OverflowTechnologiesPopoverBody>
                                {hiddenTechnologies.map((tech) => (
                                    <Link
                                        light={themeIsDark ? false : true}
                                        key={tech.id}
                                        outer={true}
                                        title={tech.label}
                                        url={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=${tech.id}`}
                                    />
                                ))}
                            </S.OverflowTechnologiesPopoverBody>
                        )}
                    />
                ) : (
                    formatNullableString(null)
                )}
            </S.TechnologiesColumnData>
            <TableData>
                {pattern.isCheck === null ? (
                    formatNullableString(null)
                ) : (
                    <Label
                        title={pattern.isCheck ? 'Успешно' : 'Ошибка'}
                        variant="contained"
                        type={pattern.isCheck ? 'success' : 'error'}
                    />
                )}
            </TableData>
            <TableData>
                {pattern.checkedAt
                    ? dayjs(formatDateToUTC(pattern.checkedAt)).local().format('DD.MM.YYYY, HH:mm')
                    : formatNullableString(null)}
            </TableData>
        </TableRow>
    );
};
