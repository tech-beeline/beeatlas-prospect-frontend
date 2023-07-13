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

import MOCK_PROFILES from './profile-mock.json';
import { SortIndicator } from './SortIndicator';
import * as S from './units';
import { UserTableProfile } from './UserTableProfile';

import 'react-tooltip/dist/react-tooltip.css';

export const PersonalArea = observer(() => {
    const {
        // @ts-ignore
        generalStore: { profiles: profilesData, getProfiles, getRoles },
    } = useRootStore();

    const [filterOption, setFilterOption] = useState({ id: 1, value: 'Везде' });

    const [itemsCountOnPage, setItemsCountOnPage] = useState(5);
    const [countPage, setCountPage] = useState(1);

    const [profiles, setProfiles] = useState(MOCK_PROFILES);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();

    useMountEffect(() => {
        // (async () => {
        getProfiles();

        getRoles();
        // })();
    });

    // useEffect(() => {}, [itemsCountOnPage]);

    const sortTableTest = (key: string) => {
        setSortKey(key);

        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));

        setProfiles((prevProfiles) => {
            return prevProfiles.sort((a: any, b: any) => {
                if (a[key] < b[key]) {
                    return sortOrder === 'asc' ? -1 : 1;
                } else if (a[key] > b[key]) {
                    return sortOrder === 'asc' ? 1 : -1;
                }

                return 0;
            });
        });
    };

    const startIndex = (countPage - 1) * itemsCountOnPage;
    const endIndex = countPage * itemsCountOnPage;
    const displayedProfiles = profiles.slice(startIndex, endIndex);

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
                        <S.TableHeaderDataStyled onClick={() => sortTableTest('full_name')}>
                            <S.TableHeaderFlexWrapper>
                                <p>ФИО</p>{' '}
                                {sortKey === 'full_name' && <SortIndicator order={sortOrder} />}
                            </S.TableHeaderFlexWrapper>
                        </S.TableHeaderDataStyled>

                        <TableHeaderData>Продукт</TableHeaderData>
                        <TableHeaderData>Роль</TableHeaderData>

                        <S.TableHeaderDataStyled
                            onClick={() => sortTableTest('last_login')}
                            alignRight
                        >
                            <S.TableHeaderFlexWrapper style={{ justifyContent: 'right' }}>
                                <p>Дата активности</p>{' '}
                                {sortKey === 'last_login' && <SortIndicator order={sortOrder} />}
                            </S.TableHeaderFlexWrapper>
                        </S.TableHeaderDataStyled>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {displayedProfiles.map((profile) => {
                        return (
                            <TableRow key={profile.id}>
                                <TableData>
                                    <UserTableProfile
                                        fullName={profile.full_name}
                                        email={profile.email}
                                    />
                                </TableData>
                                <TableData>Нет данных (бэк)</TableData>
                                {/* TODO: сделать списком */}
                                <TableData>{profile.roles[0].name}</TableData>
                                <TableData alignRight>{profile.last_login}</TableData>
                            </TableRow>
                        );
                    })}

                    <TableRow>
                        <TableData colSpan={7}>
                            <TablePagination
                                onPageChange={setCountPage}
                                onRowsPerPageChange={(perPage) => {
                                    setItemsCountOnPage(perPage);

                                    setCountPage(1);
                                }}
                                page={countPage}
                                rowsCount={profiles.length}
                                rowsPerPage={itemsCountOnPage}
                                rowsPerPageOptions={[5, 10, 30, 50]}
                                showFirstAndLastButtons
                            />
                        </TableData>
                    </TableRow>
                </TableBody>
            </Table>
        </S.PageWrapper>
    );
});
