import React, { FC } from 'react';
import { useThemeStore } from 'features/theme';

import { OverflowList } from 'components/containers';
import { Link } from 'components/other';
import { Label, TableData, TableRow } from 'components/ui';

import * as R from 'router/const';

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
            </S.TechnologiesColumnData>
        </TableRow>
    );
};
