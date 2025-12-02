import React, { FC, useState } from 'react';
import {
    IconButton,
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TooltipContainer } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import { useGetDeploymentInfluenceQuery } from 'api/queries/graph';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { TabVariant } from '../../const';

import { keyToCriticalMap, SortingVariant } from './const';
import { IDeploymentAppTable } from './types';
import * as S from './units';

export const DeploymentAppTable: FC<IDeploymentAppTable> = ({ id, tabVariant }) => {
    const [sortingVariant, setSortingVariant] = useState(SortingVariant.ASC);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data, isLoading } = useGetDeploymentInfluenceQuery({
        id,
        influence: tabVariant === TabVariant.OUT,
    });

    const dataSorted = data
        ? [...data].sort((a, b) =>
              sortingVariant === SortingVariant.ASC
                  ? (a.critical ? a.critical.split('_')[1] : '0').localeCompare(
                        b.critical ? b.critical.split('_')[1] : '0',
                    )
                  : (b.critical ? b.critical.split('_')[1] : '0').localeCompare(
                        a.critical ? a.critical.split('_')[1] : '0',
                    ),
          )
        : undefined;

    const handleCopyClick = async () => {
        if (dataSorted) {
            await navigator.clipboard.writeText(dataSorted.map((system) => system.name).join(', '));
            showSnackbar({ message: 'Список систем скопирован' });
        }
    };

    return (
        <>
            {isLoading && <Skeleton height={50} radius={12} />}
            {dataSorted && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>
                                <S.FlexContainer>
                                    {tabVariant === TabVariant.IN
                                        ? 'Используемые приложения'
                                        : 'Зависимые приложения'}{' '}
                                    <IconButton
                                        size="medium"
                                        iconName={Icons.Copy}
                                        data-tooltip-id="copy"
                                        onClick={handleCopyClick}
                                    />
                                    <TooltipContainer noArrow place="top" offset={8} id="copy">
                                        Копировать список
                                    </TooltipContainer>
                                </S.FlexContainer>
                            </TableHeaderData>
                            <TableHeaderData>
                                {tabVariant === TabVariant.IN
                                    ? 'Используемые элементы'
                                    : 'Зависимые элементы'}
                            </TableHeaderData>
                            <TableHeaderData>Приложение</TableHeaderData>
                            <TableHeaderData>
                                <S.SortingContainer
                                    onClick={() =>
                                        setSortingVariant(
                                            sortingVariant === SortingVariant.ASC
                                                ? SortingVariant.DESC
                                                : SortingVariant.ASC,
                                        )
                                    }
                                >
                                    Критичность{' '}
                                    <IconButton
                                        size="medium"
                                        iconName={
                                            sortingVariant === SortingVariant.ASC
                                                ? Icons.ArrowUp
                                                : Icons.ArrowDown
                                        }
                                    />
                                </S.SortingContainer>
                            </TableHeaderData>
                            <TableHeaderData>Владелец</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSorted.map((system) => (
                            <TableRow key={system.id}>
                                <TableData>
                                    <Link
                                        outer={false}
                                        title={system.name}
                                        url={`${R.MODELS_PATH}${R.IMPACT_PATH}?id=${system.id}&name=${system.name}&cmdb=${system.cmdb}`}
                                    />
                                </TableData>
                                <TableData>{system.dependentCount}</TableData>
                                <TableData>
                                    <Link
                                        title={system.cmdb}
                                        url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${system.cmdb}`}
                                    />
                                </TableData>
                                <TableData>
                                    {system.critical &&
                                        `${system.critical.split('_')[1]}-${
                                            keyToCriticalMap[system.critical.split('_')[0]] ??
                                            system.critical.split('_')[0]
                                        }`}
                                </TableData>
                                <TableData>{system.ownerName}</TableData>
                            </TableRow>
                        ))}
                        {dataSorted.length === 0 && (
                            <TableRow>
                                <S.TableDataMaxWidth colSpan={5}>
                                    <NotFoundBlock
                                        smallImage
                                        setMinSize={false}
                                        imageVariant={ImageVariants.EMPTY_BOX}
                                        text="Нет зависимых систем"
                                    />
                                </S.TableDataMaxWidth>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </>
    );
};
