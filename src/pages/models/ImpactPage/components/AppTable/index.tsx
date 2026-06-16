import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import {
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useGetSystemInfluenceQuery } from 'api/queries/graph';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { TabVariant } from '../../const';

import { keyToCriticalMap, SortingVariant } from './const';
import { IAppTable } from './types';
import * as S from './units';

export const AppTable: FC<IAppTable> = ({ cmdb, tabVariant, breadcrumbs, setBreadcrumbs }) => {
    const [sortingVariant, setSortingVariant] = useState(SortingVariant.ASC);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data, isLoading } = useGetSystemInfluenceQuery({
        cmdb: encodeURI(cmdb),
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
            await navigator.clipboard.writeText(dataSorted.map((system) => system.cmdb).join(', '));
            showSnackbar({ message: 'Список систем скопирован' });
        }
    };

    const navigate = useNavigate();

    const handleLinkClick = (name: string, link: string) => {
        navigate(link);
        setBreadcrumbs([...breadcrumbs, { name, link }]);
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
                                    {tabVariant === TabVariant.IN ? 'Влияющие' : 'Зависимые'}{' '}
                                    приложения{' '}
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
                            <TableRow key={system.cmdb}>
                                <TableData>
                                    <Text
                                        pointer
                                        link
                                        variant="body3"
                                        onClick={() =>
                                            handleLinkClick(
                                                system.cmdb,
                                                `${R.MODELS_PATH}${R.IMPACT_PATH}?&name=${system.cmdb}&cmdb=${system.cmdb}`,
                                            )
                                        }
                                    >
                                        {system.cmdb}
                                    </Text>
                                </TableData>
                                <TableData>
                                    {system.critical
                                        ? `${system.critical.split('_')[1]}-${
                                              keyToCriticalMap[system.critical.split('_')[0]] ??
                                              system.critical.split('_')[0]
                                          }`
                                        : formatNullableString(null)}
                                </TableData>
                                <TableData>{formatNullableString(system.ownerName)}</TableData>
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
