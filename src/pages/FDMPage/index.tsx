// import React, { FormEvent, useEffect, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from '@beeline/lk-ui';
// import { Button, Search } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

import { useWindowResize } from 'hooks';
// import { StringParam, useQueryParam } from 'use-query-params';
// import { Expand } from 'components/other';
// import { getSearchResult } from 'api/fdm';
import { useRootStore } from 'stores/initStore';

import { BreadCrumbsItem } from './BreadCrumbsItem';
// TODO: в компоненты
import { NestingMenu } from './NestingMenu';
import { TreeCard } from './TreeCard';
// import { ResultCard } from './ResultCard';
import * as S from './units';

export const FDMPage = observer(() => {
    const {
        // generalStore: { isLoadingSearch, getSearchResult, resultSearch, activeFDMItem },
        generalStore: { activeFDMItem, setActiveFDMItem, isLoadingChildren, breadCrumbsItems },
    } = useRootStore();

    const [isFullWidthCard, setFullWidthCard] = useState(false);

    // const [search, setSearch] = useQueryParam('search', StringParam);

    // const [isOpenDescription, setOpenDescription] = useState(false);
    // const [searchInput, setSearchInput] = useState('');
    // const [boldValue, setBoldValue] = useState('');

    // useEffect(() => {
    //     if (search) {
    //         getResultSearch(search);

    //         // для того чтобы сохранить значение только при запросе, но не при onChange
    //         // setBoldValue(search);
    //     }
    // }, [search]);

    // const getFindResult = async (e: FormEvent) => {
    //     e.preventDefault();

    //     setSearch(searchInput);
    // };

    const refTreeContainer = useRef(null);

    const windowWidth = useWindowResize();

    useEffect(() => {
        if (!!activeFDMItem && refTreeContainer.current) {
            const { current } = refTreeContainer;

            // @ts-ignore
            const { width } = current.getBoundingClientRect();

            console.log('width', width);

            setFullWidthCard(width <= 623);
        }
    }, [windowWidth, activeFDMItem]);

    return (
        <div style={{ display: 'flex' }}>
            <NestingMenu />

            <S.PageWrapper>
                <S.Container>
                    <S.H4>{activeFDMItem.name}</S.H4>

                    <S.JustText dangerouslySetInnerHTML={{ __html: activeFDMItem.descr }} />

                    {breadCrumbsItems.length > 1 && (
                        <Breadcrumbs collapsed={breadCrumbsItems.length > 2}>
                            {breadCrumbsItems.map((item, index) => (
                                <BreadCrumbsItem
                                    key={index}
                                    {...{ item, activeFDMItem, setActiveFDMItem }}
                                />
                            ))}
                        </Breadcrumbs>
                    )}

                    <S.TreeContainer ref={refTreeContainer}>
                        {/* {menuTreeItems.} */}

                        {isLoadingChildren
                            ? 'LOADING...'
                            : activeFDMItem.children?.map((item, index) => (
                                  <TreeCard
                                      key={index}
                                      data={item}
                                      {...{ setActiveFDMItem, isFullWidthCard }}
                                  />
                              ))}
                    </S.TreeContainer>
                    {/* <S.H4>ФДМ</S.H4>

                    <S.GrayText>
                        Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта
                        ВК, разработанная для обеспечения простой и удобной навигации в пространстве
                        возможностей по функциональному признаку.
                    </S.GrayText>

                    <Expand isOpen={isOpenDescription}>
                        <S.GrayText>
                            <br />
                            Созданная в интересах всего ИТ-ландшафта ВК ФДМ объединяет как общие
                            возможности, так и возможности, создаваемые в рамках отдельных
                            продуктовых вертикалей и представляющие особую специфику.
                            <br />
                            <br />
                            ФДМ является артефактом архитектуры бизнес-возможностей и предназначена
                            для организации представления всего многообразия бизнес-возможностей
                            (также Business Capability, BC) компании, наряду с теми технологическими
                            возможностями (также Technology Capability, TC), которые созданы
                            и представлены различными подразделениями компании в целях автоматизации
                            и повышения эффективности BC.
                            <br />
                            <br />
                            Будучи представлены в ФДМ, соответствующие возможности могут быть
                            найдены, по ним может быть получена необходимая информация, которую
                            можно использовать для поиска необходимых возможностей, проектирования
                            возможностей, позиционирования возможностей и других задач.
                            ФДМ разработана в качестве общего инструмента для различных
                            подразделений Компании (включая Бизнес и ИТ). Общую ответственность
                            за реализацию и ведение ФДМ несёт подразделение Корпоративной
                            Архитектуры ВК.
                        </S.GrayText>
                    </Expand>

                    <Button
                        variant="plain"
                        onClick={() => setOpenDescription(!isOpenDescription)}
                        style={{ margin: '16px 0' }}
                    >
                        {isOpenDescription ? 'Скрыть' : 'Подробнее'}
                    </Button> */}
                    {/* <S.SearchContainer onSubmit={getFindResult}>
                        <Search
                            fullWidth
                            placeholder="Поиск"
                            onChange={({ target: { value } }) => setSearchInput(value)}
                        />

                        <Button variant="contained">Найти</Button>
                    </S.SearchContainer> */}
                    {/* <S.ResultContainer>
                        {isLoadingSearch ? (
                            // skeleton
                            <>
                                <ResultCard />
                                <ResultCard />
                                <ResultCard />
                            </>
                        ) : resultSearch === 'nodata' ? (
                            <S.NoFoundBlock>
                                Нет результатов, подходящих под параметры поиска. Попробуйте
                                изменить запрос.
                            </S.NoFoundBlock>
                        ) : (
                            resultSearch.map((item, index) => (
                                <ResultCard data={item} key={index} {...{ search }} />
                            ))
                        )}
                    </S.ResultContainer> */}
                </S.Container>
            </S.PageWrapper>
        </div>
    );
});
