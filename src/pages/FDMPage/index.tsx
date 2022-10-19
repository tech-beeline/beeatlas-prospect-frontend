import React, { useState } from 'react';
import { Button, Search } from '@beeline/lk-ui';
import { observer } from 'mobx-react';

import { Expand } from 'components/other';

// import { getSearchResult } from 'api/fdm';
import { useRootStore } from 'stores/initStore';

import { ResultCard } from './ResultCard';
import * as S from './units';

export const FDMPage = observer(() => {
    const {
        generalStore: { isLoadingSearch, getResultSearch, resultSearch },
    } = useRootStore();

    const [isOpenDescription, setOpenDescription] = useState(false);
    // const [result, setResult] = useState({ data: [] });

    const getFindResult = async (value: string) => {
        // setResult(await getSearchResult(value));

        // console.log(result);
        getResultSearch(value);
    };

    return (
        <S.PageWrapper>
            <S.Container>
                <S.H4>ФДМ</S.H4>

                <S.GrayText>
                    Функционально-Доменная Модель — это модель бизнес-возможностей ИТ-ландшафта ВК,
                    разработанная для обеспечения простой и удобной навигации в пространстве
                    возможностей по функциональному признаку.
                </S.GrayText>

                <Expand isOpen={isOpenDescription}>
                    <iframe
                        id="iFrameExample"
                        title="test"
                        src="http://ms-seaapp001/?guid=443A0FEE-EE47-4014-B9FD-9AFB06634E74"
                    ></iframe>

                    <S.GrayText>
                        <br />
                        Созданная в интересах всего ИТ-ландшафта ВК ФДМ объединяет как общие
                        возможности, так и возможности, создаваемые в рамках отдельных продуктовых
                        вертикалей и представляющие особую специфику.
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
                        Будучи представлены в ФДМ, соответствующие возможности могут быть найдены,
                        по ним может быть получена необходимая информация, которую можно
                        использовать для поиска необходимых возможностей, проектирования
                        возможностей, позиционирования возможностей и других задач. ФДМ разработана
                        в качестве общего инструмента для различных подразделений Компании (включая
                        Бизнес и ИТ). Общую ответственность за реализацию и ведение ФДМ несёт
                        подразделение Корпоративной Архитектуры ВК.
                    </S.GrayText>
                </Expand>

                <Button
                    variant="plain"
                    onClick={() => setOpenDescription(!isOpenDescription)}
                    style={{ margin: '16px 0' }}
                >
                    {isOpenDescription ? 'Скрыть' : 'Подробнее'}
                </Button>

                <S.SearchContainer>
                    <Search fullWidth placeholder="Поиск" />

                    <Button variant="contained" onClick={() => getFindResult('тест')}>
                        Найти
                    </Button>
                </S.SearchContainer>

                <S.ResultContainer>
                    {isLoadingSearch ? (
                        <>
                            <ResultCard />
                            <ResultCard />
                            <ResultCard />
                        </>
                    ) : resultSearch === 'nodata' ? (
                        <S.NoFoundBlock>
                            Нет результатов, подходящих под параметры поиска. Попробуйте изменить
                            запрос.
                        </S.NoFoundBlock>
                    ) : (
                        resultSearch.map((item, index) => <ResultCard data={item} key={index} />)
                    )}
                </S.ResultContainer>
            </S.Container>
        </S.PageWrapper>
    );
});
