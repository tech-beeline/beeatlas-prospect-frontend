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

import { useGetSystemInfluenceQuery } from 'api/queries/product';
import * as R from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { keyToCriticalMap, SortingVariant } from './const';
import { IAppTable } from './types';
import * as S from './units';

export const AppTable: FC<IAppTable> = ({ cmdb }) => {
    const [sortingVariant, setSortingVariant] = useState(SortingVariant.ASC);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data: systemData, isLoading: isLoadingSystems } = useGetSystemInfluenceQuery({
        cmdb,
        // enabled: !deploymentName,
        enabled: true,
    });

    // const { data: deploymentData, isLoading: isLoadingDeployments } =
    //     useGetDeploymentInfluenceQuery({
    //         cmdb,
    //         enabled: !!deploymentName,
    //     });

    // const isLoading = !deploymentName ? isLoadingSystems : isLoadingDeployments;
    const isLoading = isLoadingSystems;
    // const data = !deploymentName ? systemData : deploymentData;
    const data = systemData?.dependentSystems;

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
            await navigator.clipboard.writeText(
                dataSorted.map((system) => system.alias).join(', '),
            );
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
                                    Зависимые системы{' '}
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
                            <TableRow key={system.alias}>
                                <TableData>
                                    <Link
                                        title={system.alias}
                                        url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${system.alias}`}
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
                                <S.TableDataMaxWidth colSpan={3}>
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
