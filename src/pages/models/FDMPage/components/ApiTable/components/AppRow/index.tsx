import React, { FC, useState } from 'react';

import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { TableData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { InterfaceRow } from './components';
import { IAppRow } from './types';
import * as S from './units';

export const AppRow: FC<IAppRow> = ({ fullData, productOperation }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const uniqueInterfaces = Array.from(
        new Set(
            fullData
                .filter((o) => o.product.id === productOperation.product.id)
                .map((o) => o.interface.id),
        ),
    ).map((interfaceId) => fullData.find((o) => o.interface.id === interfaceId)!);

    const uniqueMethods = fullData.filter((o) => o.product.id === productOperation.product.id);

    return (
        <>
            <TableRow>
                <TableData>
                    <S.NameContainer>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                        <Link
                            title={productOperation.product.name}
                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${productOperation.product.alias}`}
                        />
                    </S.NameContainer>
                </TableData>
                <TableData alignRight>{uniqueInterfaces.length}</TableData>
                <TableData alignRight>{uniqueMethods.length}</TableData>
            </TableRow>
            {isExpanded && (
                <>
                    <>
                        <TableRow>
                            <TableData colSpan={2}>
                                <S.TableHeadContainer first>Интерфейс</S.TableHeadContainer>
                            </TableData>
                            <TableData alignRight>
                                <S.TableHeadContainer>Кол-во методов</S.TableHeadContainer>
                            </TableData>
                        </TableRow>
                        {uniqueInterfaces.map((interfaceOperation, i) => (
                            <InterfaceRow
                                key={i}
                                fullData={fullData}
                                interfaceOperation={interfaceOperation}
                            />
                        ))}
                    </>
                </>
            )}
        </>
    );
};
