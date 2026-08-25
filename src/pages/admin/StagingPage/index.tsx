import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
    initialStagingFilterValues,
    pipelineStatusOptions,
    pipelineStatusToNameMap,
} from 'features/staging';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Button,
    DatePickerRange,
    Select,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from 'components/ui';

import {
    useGetPipelineArtifactTypesQuery,
    useGetPipelineDataSourcesQuery,
    useGetPipelineRunsQuery,
} from 'api/queries/staging-service';

import { PreAdapterRow } from './components';
import { IStagingFilterValues } from './types';
import * as S from './units';

export const StagingPage = () => {
    const [filterValues, setFilterValues] = useState<IStagingFilterValues>(
        initialStagingFilterValues,
    );
    const hasTwoDates =
        filterValues.dateRange && filterValues.dateRange[0] && filterValues.dateRange[1];

    const [countPage, setCountPage] = useState(1);
    const [itemsCountOnPage, setItemsCountOnPage] = useState(10);

    const { data: pipileneRuns, isLoading: isPipileneRunsLoading } = useGetPipelineRunsQuery({
        limit: itemsCountOnPage,
        offset: (countPage - 1) * itemsCountOnPage,
        status: filterValues.status,
        dateFrom: hasTwoDates ? dayjs(filterValues.dateRange[0]).local().toISOString() : null,
        dateTo: hasTwoDates
            ? dayjs(filterValues.dateRange[1]).add(1, 'day').local().toISOString()
            : null,
        sourceName: filterValues.source,
        artifactType: filterValues.type,
    });
    const { data: dataSources, isLoading: isLoadingDataSources } = useGetPipelineDataSourcesQuery();
    const { data: artifactTypes, isLoading: isLoadingArtifactTypes } =
        useGetPipelineArtifactTypesQuery();

    const dataSourcesOptions = (dataSources ?? []).map((dataSource) => ({
        id: dataSource.name,
        value: dataSource.name,
    }));
    const artifactTypesOptions = (artifactTypes ?? []).map((artifactType) => ({
        id: artifactType.name,
        value: artifactType.name,
    }));

    const isLoading = isPipileneRunsLoading || isLoadingDataSources || isLoadingArtifactTypes;

    useEffect(() => {
        setCountPage(1);
    }, [filterValues]);

    const isResetButtonActive =
        filterValues.dateRange.length > 0 ||
        filterValues.status !== null ||
        filterValues.type !== null ||
        filterValues.source !== null ||
        filterValues.search.length > 0;

    const handleResetButtonClick = () => {
        setFilterValues(initialStagingFilterValues);
        setCountPage(1);
    };

    return (
        <S.PageWrapper>
            <Text variant="h4">Наблюдаемость запусков pipeline</Text>
            <S.FiltersContainer>
                {/* <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Поиск по ID и конфигурации"
                        value={filterValues.search}
                        onChange={(e) =>
                            setFilterValues({ ...filterValues, search: e.target.value })
                        }
                        onClear={() => setFilterValues({ ...filterValues, search: '' })}
                    />
                </S.SearchContainer>
                <div />
                <div />
                <div /> */}
                <DatePickerRange
                    fullWidth
                    placeholder="Дата"
                    value={filterValues.dateRange}
                    onChange={(dates) =>
                        setFilterValues({ ...filterValues, dateRange: dates ?? [] })
                    }
                />
                <Select
                    fullWidth
                    placeholder="Статус"
                    options={pipelineStatusOptions}
                    disabled={isLoading}
                    values={
                        filterValues.status
                            ? [
                                  {
                                      id: filterValues.status,
                                      value: pipelineStatusToNameMap[filterValues.status],
                                  },
                              ]
                            : []
                    }
                    onChange={(values) =>
                        setFilterValues({
                            ...filterValues,
                            status: values[0]?.id ?? null,
                        })
                    }
                />
                <Select
                    fullWidth
                    disabled={isLoading}
                    placeholder="Тип"
                    options={artifactTypesOptions}
                    values={
                        filterValues.type
                            ? [artifactTypesOptions.find((ds) => ds.id === filterValues.type)!]
                            : []
                    }
                    onChange={(values) =>
                        setFilterValues({
                            ...filterValues,
                            type: values[0].id,
                        })
                    }
                />
                <Select
                    fullWidth
                    disabled={isLoading}
                    placeholder="Источник"
                    options={dataSourcesOptions}
                    values={
                        filterValues.source
                            ? [dataSourcesOptions.find((ds) => ds.id === filterValues.source)!]
                            : []
                    }
                    onChange={(values) =>
                        setFilterValues({
                            ...filterValues,
                            source: values[0].id,
                        })
                    }
                />
                <Button
                    disabled={!isResetButtonActive}
                    variant="plain"
                    size="medium"
                    onClick={handleResetButtonClick}
                >
                    Сбросить
                </Button>
            </S.FiltersContainer>
            <Text variant="h5">Запуски pre-adapter</Text>
            {isPipileneRunsLoading && <Skeleton radius={12} height={100} />}
            {pipileneRuns && pipileneRuns.results.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataNoWrap>ID</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Тип артефакта</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Статус</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Источник</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Запущен</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Завершён</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Длительность</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Дочерние Pipelines</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>
                                Статус дочерних pipelines
                            </S.TableHeaderDataNoWrap>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {pipileneRuns.results.map((run) => (
                            <PreAdapterRow key={run.id} run={run} />
                        ))}

                        <TableRow>
                            <TableData colSpan={9} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
                                    }}
                                    page={countPage}
                                    rowsCount={pipileneRuns.totalCount}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[10, 25, 50, 100]}
                                    showFirstAndLastButtons
                                />
                            </TableData>
                        </TableRow>
                    </TableBody>
                </S.TableStyled>
            )}
            {!isPipileneRunsLoading && pipileneRuns && pipileneRuns.totalCount === 0 && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Нет результатов, подходящих под параметры поиска"
                    text="Попробуйте изменить поисковой запрос"
                />
            )}
        </S.PageWrapper>
    );
};
