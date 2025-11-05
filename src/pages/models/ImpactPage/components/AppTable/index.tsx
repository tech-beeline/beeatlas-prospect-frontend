import React, { FC } from 'react';
import {
    Skeleton,
    // IconButton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

// import { Icons } from '@beeline/design-tokens/js/iconfont';
// import { TooltipContainer } from 'components/interaction';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';

import { useGetSystemInfluenceQuery } from 'api/queries/product';
import * as R from 'router/const';

import { keyToCriticalMap } from './const';
import { IAppTable } from './types';
import * as S from './units';

export const AppTable: FC<IAppTable> = ({ cmdb }) => {
    // const [sortingVariant, setSortingVariant] = useState(false);

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
    const data = systemData;

    return (
        <>
            {isLoading && <Skeleton height={50} radius={12} />}
            {data && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>
                                <S.FlexContainer>
                                    Зависимые системы{' '}
                                    {/* <IconButton
                                        size="medium"
                                        iconName={Icons.Copy}
                                        data-tooltip-id="copy"
                                    />
                                    <TooltipContainer noArrow place="top" offset={8} id="copy">
                                        Копировать список
                                    </TooltipContainer> */}
                                </S.FlexContainer>
                            </TableHeaderData>
                            <TableHeaderData>
                                <S.FlexContainer>
                                    Критичность{' '}
                                    {/* <IconButton
                                        size="medium"
                                        iconName={sortingVariant ? Icons.ArrowUp : Icons.ArrowDown}
                                        onClick={() => setSortingVariant(!sortingVariant)}
                                    /> */}
                                </S.FlexContainer>
                            </TableHeaderData>
                            <TableHeaderData>Владелец</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.dependentSystems.map((system) => (
                            <TableRow key={system.alias}>
                                <TableData>
                                    <Link
                                        title={system.alias}
                                        url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${system.alias}`}
                                    />
                                </TableData>
                                <TableData>
                                    {system.critical &&
                                        `${
                                            keyToCriticalMap[system.critical.split('_')[0]] ??
                                            system.critical.split('_')[0]
                                        } ${system.critical.split('_')[1]}`}
                                </TableData>
                                <TableData>{system.ownerName}</TableData>
                            </TableRow>
                        ))}
                        {data.dependentSystems.length === 0 && (
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
