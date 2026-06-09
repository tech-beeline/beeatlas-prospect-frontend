import React, { FC, useState } from 'react';

import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Label, TableBody, TableData, TableHead, TableHeaderData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IApplicationsTableRow } from './types';
import * as S from './units';

export const ApplicationsTableRow: FC<IApplicationsTableRow> = ({ level = 0, application }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow>
                <TableData>
                    <S.NameContainer level={level}>
                        <S.IconButtonContainer>
                            {(application.childrenBlocks.length > 0 ||
                                application.childrenApps.length > 0) && (
                                <IconButton
                                    size="medium"
                                    iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                />
                            )}
                        </S.IconButtonContainer>
                        {application.name}
                    </S.NameContainer>
                </TableData>
            </TableRow>
            {isExpanded &&
                application.childrenBlocks.length > 0 &&
                application.childrenBlocks.map((block) => (
                    <ApplicationsTableRow key={block.name} level={level + 1} application={block} />
                ))}
            {isExpanded && application.childrenApps.length > 0 && (
                <TableRow>
                    <S.TableContainer level={level + 1}>
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Приложение</TableHeaderData>
                                    <TableHeaderData>CMDB&nbsp;Мнемоника</TableHeaderData>
                                    <TableHeaderData>Владелец</TableHeaderData>
                                    <TableHeaderData>Статус</TableHeaderData>
                                    <TableHeaderData>Критичность</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {application.childrenApps.map((app) => (
                                    <TableRow key={app.name}>
                                        <TableData>
                                            <Link
                                                outer={false}
                                                title={app.name}
                                                url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                                            />
                                        </TableData>
                                        <TableData>{app.cmdbMnemonic}</TableData>
                                        <TableData>
                                            Константинопольский Константин Константинович
                                        </TableData>
                                        <TableData>
                                            <Label
                                                title="В эксплуатации"
                                                type="success"
                                                variant="contained"
                                            />
                                        </TableData>
                                        <TableData>Office Productivity</TableData>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </S.TableStyled>
                    </S.TableContainer>
                </TableRow>
            )}
        </>
    );
};
