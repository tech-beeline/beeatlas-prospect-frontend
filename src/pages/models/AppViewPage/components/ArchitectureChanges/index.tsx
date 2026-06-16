import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'components/other';
import { TableHeaderData } from 'components/ui';
import { Button, Checkbox, Table, TableBody, TableData, TableHead, TableRow } from 'components/ui';

import * as R from 'router/const';

import { IVersion, VERSIONS } from './const';
import * as S from './units';

export const ArchitectureChanges = () => {
    const [versionIds, setVersionIds] = useState<number[]>([]);

    const navigate = useNavigate();

    const handleCheckboxClick = (version: IVersion) => {
        if (versionIds.includes(version.id)) {
            setVersionIds(versionIds.filter((id) => id !== version.id));
        } else {
            setVersionIds([...versionIds, version.id]);
        }
    };

    const handleButtonClick = () => {
        navigate(
            `${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}${R.ARCHITECTURE_PATH}?v=${versionIds[0]},${versionIds[1]}`,
        );
    };

    return (
        <S.Container>
            <div>
                <Button disabled={versionIds.length !== 2} onClick={handleButtonClick}>
                    Сравнить версии
                </Button>
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData />
                            <TableHeaderData>Версия</TableHeaderData>
                            <TableHeaderData>Дата</TableHeaderData>
                            <TableHeaderData>Успешные/Всего фитнес-функций</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {VERSIONS.map((version, i) => (
                            <TableRow key={version.id}>
                                <TableData>
                                    <Checkbox
                                        checked={versionIds.includes(version.id)}
                                        disabled={
                                            versionIds.length === 2 &&
                                            !versionIds.includes(version.id)
                                        }
                                        onClick={() => handleCheckboxClick(version)}
                                    />
                                </TableData>
                                <TableData>
                                    <Link
                                        outer={false}
                                        title={
                                            i === 0
                                                ? `Текущая (№${version.num})`
                                                : `Версия №${version.num}`
                                        }
                                        url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}${R.ARCHITECTURE_PATH}?v=${version.id}`}
                                    />
                                </TableData>
                                <TableData>{version.date}</TableData>
                                <TableData>
                                    {version.succesFunctions}/{version.totalFunctions}
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </S.Container>
    );
};
