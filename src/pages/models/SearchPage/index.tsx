import React, { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Expand } from 'components/other';
import { Search } from 'components/ui';
import { Button } from 'components/ui';

import { useGetCapabilitiesQuery } from 'api/queries/capability';
import { useMountEffect } from 'hooks';
import { getStorage, persistStorage } from 'stores/utils';
import * as STYLES from 'styles/units';

import { NotFoundBlock, RefineRequestBlock, ResultCard, ResultCardSkeleton } from './components';
import { STORAGE_KEY } from './const';
import * as S from './units';

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isOpenDescription, setOpenDescription] = useState(false);
    const [request, setRequest] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const { data, isLoading, error } = useGetCapabilitiesQuery({ search: request });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setRequest(searchInput);
    };

    useEffect(() => {
        if (request !== '') {
            persistStorage(STORAGE_KEY, request);
            setSearchParams(new URLSearchParams({ request }), { replace: true });
        }
    }, [request]);

    useMountEffect(() => {
        const requestParam = searchParams.get('request');
        const savedRequest = getStorage(STORAGE_KEY);
        if (requestParam) {
            setSearchInput(requestParam);
            setRequest(requestParam);
        } else if (savedRequest) {
            setSearchInput(savedRequest);
            setRequest(savedRequest);
            setSearchParams(new URLSearchParams({ request: savedRequest }), { replace: true });
        }
    });

    return (
        <S.PageWrapper>
            <S.Container>
                <S.H4 className="H4">ФДМ</S.H4>

                <STYLES.GrayText>
                    Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта ВК,
                    разработанная для обеспечения простой и удобной навигации в пространстве
                    возможностей по функциональному признаку.
                </STYLES.GrayText>

                <Expand isOpen={isOpenDescription}>
                    <STYLES.GrayText>
                        <br />
                        Созданная в интересах всего ИТ-ландшафта ВК ФДМ объединяет как общие
                        возможности, так и возможности, создаваемые в рамках отдельных продуктовых
                        вертикалей и представляющие особую специфику.
                        <br />
                        <br />
                        ФДМ является артефактом архитектуры бизнес-возможностей и предназначена для
                        организации представления всего многообразия бизнес-возможностей (также
                        Business Capability, BC) компании, наряду с теми технологическими
                        возможностями (также Technology Capability, TC), которые созданы и
                        представлены различными подразделениями компании в целях автоматизации и
                        повышения эффективности BC.
                        <br />
                        <br />
                        Будучи представлены в ФДМ, соответствующие возможности могут быть найдены,
                        по ним может быть получена необходимая информация, которую можно
                        использовать для поиска необходимых возможностей, проектирования
                        возможностей, позиционирования возможностей и других задач. ФДМ разработана
                        в качестве общего инструмента для различных подразделений Компании (включая
                        Бизнес и ИТ). Общую ответственность за реализацию и ведение ФДМ несёт
                        подразделение Корпоративной Архитектуры ВК.
                    </STYLES.GrayText>
                </Expand>

                <Button
                    variant="plain"
                    onClick={() => setOpenDescription(!isOpenDescription)}
                    style={{ margin: '16px 0' }}
                >
                    {isOpenDescription ? 'Скрыть' : 'Подробнее'}
                </Button>

                <S.SearchContainer onSubmit={handleSubmit}>
                    <Search
                        fullWidth
                        placeholder="Поиск"
                        onChange={({ target: { value } }) => setSearchInput(value)}
                        onClear={() => setSearchInput('')}
                        value={searchInput}
                        maxLength={400}
                    />

                    <Button
                        variant="contained"
                        disabled={!searchInput}
                        style={{ padding: '0 20px' }}
                    >
                        Найти
                    </Button>
                </S.SearchContainer>

                <S.ResultContainer className="ResultContainer">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => <ResultCardSkeleton key={i} />)
                    ) : (data?.length && data.length > 200) ||
                      (error && (error as AxiosError).response?.status === 422) ? (
                        <RefineRequestBlock />
                    ) : data?.length === 0 ? (
                        <NotFoundBlock />
                    ) : (
                        data?.map((item, index) => (
                            <ResultCard data={item} key={index} {...{ request }} />
                        ))
                    )}
                </S.ResultContainer>
            </S.Container>
        </S.PageWrapper>
    );
};
