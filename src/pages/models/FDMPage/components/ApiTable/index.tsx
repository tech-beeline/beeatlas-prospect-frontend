import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { TableHeaderData } from 'components/ui';
import { Skeleton, Table, TableBody, TableHead, TableRow } from 'components/ui';

import { useGetOperationsByTechCapabilityQuery } from 'api/queries/product';

import { AppRow } from './components';
import { IApiTable } from './types';
import * as S from './units';

export const ApiTable: FC<IApiTable> = ({ tcId }) => {
    const { data, isLoading } = useGetOperationsByTechCapabilityQuery(tcId);

    const uniqueProducts = data
        ? Array.from(new Set(data.map((o) => o.product.id))).map(
              (productId) => data.find((o) => o.product.id === productId)!,
          )
        : [];

    return (
        <>
            {data && data.length !== 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataMaxWidth>
                                Приложение реализатор
                            </S.TableHeaderDataMaxWidth>
                            <TableHeaderData>Кол&#8209;во&nbsp;интерфейсов</TableHeaderData>
                            <TableHeaderData>
                                Кол&#8209;во&nbsp;методов&nbsp;в&nbsp;интерфейсах
                            </TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uniqueProducts.map((productOperation, i) => (
                            <AppRow fullData={data} productOperation={productOperation} key={i} />
                        ))}
                    </TableBody>
                </Table>
            )}
            {data && data.length === 0 && (
                <S.NotFoundWrapper>
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            smallImage
                            setMinSize={false}
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="API нет"
                            text="На данный момент для данной технической возможности не добавлена связь с интерфейсами или методами"
                        />
                    </S.NotFoundContainer>
                </S.NotFoundWrapper>
            )}
            {isLoading && <Skeleton radius={12} height={100} />}
        </>
    );
};
