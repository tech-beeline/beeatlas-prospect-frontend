import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Icon,
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

// import MOCK_PROFILES from './profile-mock.json';
import { EmptyState, SortIndicator, UserTableProfile } from './components';
import * as S from './units';

import 'react-tooltip/dist/react-tooltip.css';

export const PersonalArea = observer(() => {
    const {
        generalStore: { profiles: profilesData, getProfiles },
    } = useRootStore();

    const [searchValue, setSearchValue] = useState('');
    const [filterOption, setFilterOption] = useState({ id: 'all', value: 'Везде' });

    const [itemsCountOnPage, setItemsCountOnPage] = useState(5);
    const [countPage, setCountPage] = useState(1);

    const [profiles, setProfiles] = useState(profilesData);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();

    useMountEffect(() => {
        getProfiles();
    });

    useEffect(() => {
        setProfiles(profilesData);
    }, [profilesData]);

    const onSearchData = (value: string) => {
        setCountPage(1);

        setSearchValue(value);

        const searchTerm = value.toLowerCase();

        if (!searchTerm) {
            // если searchTerm пуст, возвращаем исходный массив
            setProfiles(profilesData);

            return;
        }

        // TODO: тип
        const filterHandler = (profile: Record<string, any>) => {
            if (filterOption.id === 'all') {
                // поиск по всем полям и ролям
                return (
                    Object.values(profile).some(
                        (value) =>
                            typeof value === 'string' && value.toLowerCase().includes(searchTerm),
                    ) ||
                    profile.roles.some((role: Record<string, string>) =>
                        role.name.toLowerCase().includes(searchTerm),
                    )
                );
            } else if (filterOption.id === 'role') {
                // поиск только по ролям
                return profile.roles.some((role: Record<string, string>) =>
                    role.name.toLowerCase().includes(searchTerm),
                );
            } else {
                // поиск по выбранному ключу
                return profile[filterOption.id].toLowerCase().includes(searchTerm);
            }
        };

        setProfiles(() => profilesData.filter(filterHandler));
    };

    useEffect(() => {
        console.log('filterOption', filterOption);
        onSearchData(searchValue);
    }, [filterOption]);

    const sortTable = (key: string) => {
        setSortKey(key);

        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));

        setProfiles((prevProfiles) => {
            return prevProfiles.slice().sort((a: any, b: any) => {
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
                Управление ролями
                <S.HintStyled text="Настройки ролей" tooltipId={`100`}>
                    <Icon
                        iconName={Icons.Settings}
                        onClick={() =>
                            navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}`)
                        }
                    />
                </S.HintStyled>
            </S.Title>

            <S.SearchStyled
                placeholder="Поиск"
                value={searchValue}
                filterItems={[
                    { id: 'all', value: 'Везде' },
                    { id: 'full_name', value: 'ФИО' },
                    { id: 'role', value: 'Роль' },
                    { id: 'email', value: 'E-mail' },
                    { id: 'login', value: 'Логин' },
                ]}
                selectedFilter={filterOption}
                onFilterChange={(option: any) => setFilterOption(option)}
                onChange={(e) => onSearchData(e.target.value)}
                onClear={() => setProfiles(profilesData)}
            />
            {displayedProfiles.length === 0 ? (
                <EmptyState />
            ) : (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataStyled onClick={() => sortTable('full_name')}>
                                <S.TableHeaderFlexWrapper>
                                    <p>ФИО</p>{' '}
                                    {sortKey === 'full_name' && <SortIndicator order={sortOrder} />}
                                </S.TableHeaderFlexWrapper>
                            </S.TableHeaderDataStyled>

                            <TableHeaderData>Продукт</TableHeaderData>
                            <TableHeaderData>Роль</TableHeaderData>

                            <S.TableHeaderDataStyled
                                onClick={() => sortTable('last_login')}
                                alignRight
                            >
                                <S.TableHeaderFlexWrapper style={{ justifyContent: 'right' }}>
                                    <p>Дата активности</p>{' '}
                                    {sortKey === 'last_login' && (
                                        <SortIndicator order={sortOrder} />
                                    )}
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
                                    <TableData>
                                        {profile.roles?.length > 0 &&
                                            profile.roles.map((role: any) => role.name)}
                                    </TableData>
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
                </S.TableStyled>
            )}
        </S.PageWrapper>
    );
});
