import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { TableHeaderData } from 'components/ui';
import { Button, Skeleton, TableBody, TableHead, TableRow } from 'components/ui';

import { useGetAllFitnessFunctionsQuery } from 'api/queries/fitness-functions';
import * as R from 'router/const';

import { FitnessFunctionFilters, FitnessFunctionTableRow } from './components';
import { IFitnessFunctionsFilters } from './types';
import * as S from './units';
import { filterFitnessFunctions } from './utils';

export const FitnessFunctionsPage = () => {
    const navigate = useNavigate();

    const [filterValues, setFilterValues] = useState<IFitnessFunctionsFilters>({
        selectedFitnessFunctionId: null,
        type: null,
        status: null,
        isTrigger: false,
    });

    const { data, isLoading } = useGetAllFitnessFunctionsQuery();

    const filteredData = filterFitnessFunctions(data ?? [], filterValues);

    return (
        <S.PageWrapper>
            <S.TitleContainer>
                <Text variant="h4">Управление кастомными фитнес-функциями</Text>
                <S.ButtonsContainer>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                            navigate(`${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}${R.ADD_PATH}`)
                        }
                    >
                        Создать фитнес-функции
                    </Button>
                </S.ButtonsContainer>
            </S.TitleContainer>

            <FitnessFunctionFilters
                fitnessFunctions={data ?? []}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
            />

            {isLoading && <Skeleton height={300} />}

            {filteredData && filteredData.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Код</TableHeaderData>
                            <TableHeaderData>Название</TableHeaderData>
                            <TableHeaderData>Тип</TableHeaderData>
                            <TableHeaderData>Триггер</TableHeaderData>
                            <TableHeaderData>Статус</TableHeaderData>
                            <TableHeaderData>Применимость</TableHeaderData>
                            <S.TableHeaderDataButtons />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredData.map((fitnessFunction) => (
                            <FitnessFunctionTableRow
                                key={fitnessFunction.id}
                                fitnessFunction={fitnessFunction}
                            />
                        ))}
                    </TableBody>
                </S.TableStyled>
            )}
            {!isLoading && filteredData && filteredData.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        title="Нет результатов, подходящих под параметры поиска"
                        text="Попробуйте изменить запрос"
                    />
                </S.NotFoundContainer>
            )}
        </S.PageWrapper>
    );
};
