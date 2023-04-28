import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Icon,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TablePagination,
    TableRow,
    // Tooltip,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { observer } from 'mobx-react';

import { useMountEffect } from 'hooks';
import * as ROUTER from 'router/const';
import { useRootStore } from 'stores/initStore';

// import { TablePagination } from '@beeline/design-system-react';
import * as S from './units';

import 'react-tooltip/dist/react-tooltip.css';

export const PersonalArea = observer(() => {
    const {
        generalStore: { getRoles },
    } = useRootStore();

    const [filterOption, setFilterOption] = useState({ id: 1, value: 'Везде' });

    const navigate = useNavigate();

    useMountEffect(() => {
        getRoles();
    });

    return (
        <S.PageWrapper className="PageWrapper">
            <S.Title className="Title">
                Управление ролями {/* <Tooltip title="test test"> */}
                <S.HintStyled text="Настройки ролей" tooltipId={`100`}>
                    <Icon
                        iconName={Icons.Settings}
                        onClick={() =>
                            navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}`)
                        }
                    />
                </S.HintStyled>
                {/* <Hint text={'test'} tooltipId={`100`} /> */}
                {/* </Tooltip> */}
            </S.Title>

            <S.SearchStyled
                placeholder="Поиск"
                filterItems={[
                    { id: 0, value: 'Везде' },
                    { id: 1, value: 'ФИО' },
                    { id: 2, value: 'Роль' },
                    { id: 3, value: 'E-mail' },
                    { id: 4, value: 'Логин' },
                ]}
                selectedFilter={filterOption}
                // @ts-ignore
                onFilterChange={(option) => setFilterOption(option)}
            />

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
