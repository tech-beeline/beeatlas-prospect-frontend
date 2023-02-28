import React from 'react';
import {
    Icon,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TablePagination,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { observer } from 'mobx-react';

import { useMountEffect } from 'hooks';
import { useRootStore } from 'stores/initStore';

// import { TablePagination } from '@beeline/design-system-react';
import * as S from './units';

export const PersonalArea = observer(() => {
    const {
        generalStore: { getRoles },
    } = useRootStore();

    useMountEffect(() => {
        getRoles();
    });

    return (
        <S.PageWrapper>
            <S.Title>
                Управление ролями <Icon iconName={Icons.Settings} />
            </S.Title>

            <S.SearchStyled placeholder="Поиск" />

            <Table
                style={{
                    width: '100%',
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableHeaderData>ФИО</TableHeaderData>
                        <TableHeaderData>Продукт</TableHeaderData>
                        <TableHeaderData>Роль</TableHeaderData>
                        <TableHeaderData alignRight>Дата активности</TableHeaderData>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <React.Fragment key=".0">
                        <TableRow>
                            <TableData>item 1</TableData>
                            <TableData>item 1</TableData>
                            <TableData>item 1</TableData>
                            <TableData alignRight>item 1</TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>item 2</TableData>
                            <TableData>item 2</TableData>
                            <TableData>item 2</TableData>
                            <TableData alignRight>item 2</TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>item 3</TableData>
                            <TableData>item 3</TableData>
                            <TableData>item 3</TableData>
                            <TableData alignRight>item 3</TableData>
                        </TableRow>
                    </React.Fragment>
                    <TableRow>
                        <TableData
                            colSpan={7}
                            style={{
                                fontSize: 'unset',
                            }}
                        >
                            <TablePagination
                                onPageChange={() => console.log('onPageChange')}
                                onRowsPerPageChange={() => console.log('onRowsPerPageChange')}
                                page={1}
                                rowsCount={19}
                                rowsPerPage={5}
                                rowsPerPageOptions={[2, 5, 10, 15, 30]}
                                showFirstAndLastButtons
                            />
                        </TableData>
                    </TableRow>
                </TableBody>
            </Table>
        </S.PageWrapper>
    );
});
