import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Search } from '@beeline/design-system-react';
import { observer } from 'mobx-react';
import { StringParam, useQueryParam } from 'use-query-params';

import { Expand } from 'components/other';

import { useMountEffect } from 'hooks';
import { useRootStore } from 'stores/initStore';
import { getStorage, persistStorage } from 'stores/utils';
import * as STYLES from 'styles/units';

import { NotFoundBlock, RefineRequestBlock, ResultCard } from './components';
import * as S from './units';

export const SearchPage = observer(() => {
    const {
        generalStore: { isLoadingSearch, getResultSearch, resultSearch },
    } = useRootStore();

    const [request, setRequest] = useQueryParam('request', StringParam);

    const [isOpenDescription, setOpenDescription] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const searchRef = useRef(null);

    useMountEffect(() => {
        const savedRequest = getStorage('requestKey');

        if (savedRequest) {
            setTimeout(() => {
                setRequest(request || savedRequest, 'replaceIn');

                setSearchInput(request || savedRequest);
            }, 200);
        }
    });

    const getFindResult = async (e: FormEvent) => {
        e.preventDefault();

        setRequest(searchInput, 'replaceIn');
    };

    // костыль чтобы навесить событие на иконку в готовом компоненте
    useEffect(() => {
        // @ts-ignore
        searchRef.current?.children[0].children[0].addEventListener('click', (e) =>
            getFindResult(e),
        );
    }, [searchRef.current]);

    useEffect(() => {
        if (request) {
            getResultSearch(request);

            persistStorage('requestKey', request);

            // для того чтобы сохранить значение только при запросе, но не при onChange
            // setBoldValue(search);
        }
    }, [request]);

    return (
        <>
            <S.MarginBlock />
            <S.PageWrapper>
                <S.Container>
                    <S.H4 className="H4">ФДМ</S.H4>

                    <STYLES.GrayText>
                        Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта
                        ВК, разработанная для обеспечения простой и удобной навигации в пространстве
                        возможностей по функциональному признаку.
                    </STYLES.GrayText>

                    <Expand isOpen={isOpenDescription}>
                        <STYLES.GrayText>
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
                        </STYLES.GrayText>
                    </Expand>

                    <Button
                        variant="plain"
                        onClick={() => setOpenDescription(!isOpenDescription)}
                        style={{ margin: '16px 0' }}
                    >
                        {isOpenDescription ? 'Скрыть' : 'Подробнее'}
                    </Button>

                    <S.SearchContainer onSubmit={getFindResult} ref={searchRef}>
                        <Search
                            fullWidth
                            placeholder="Поиск"
                            onChange={({ target: { value } }) => setSearchInput(value)}
                            value={searchInput}
                            maxLength={400}
                        />

                        <Button variant="contained" style={{ padding: '0 20px' }}>
                            Найти
                        </Button>
                    </S.SearchContainer>

                    <S.ResultContainer className="ResultContainer">
                        {isLoadingSearch ? (
                            // skeleton
                            Array.from({ length: 3 }).map((_, i) => <ResultCard key={i} />)
                        ) : resultSearch.length > 200 ? (
                            <RefineRequestBlock />
                        ) : resultSearch === 'nodata' ? (
                            <NotFoundBlock />
                        ) : (
                            resultSearch.map((item, index) => (
                                <ResultCard data={item} key={index} {...{ request }} />
                            ))
                        )}
                    </S.ResultContainer>
                </S.Container>
            </S.PageWrapper>
        </>
    );
});
