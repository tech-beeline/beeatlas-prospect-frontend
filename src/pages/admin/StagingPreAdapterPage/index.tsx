import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    pipelineStatusOptions,
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
    RawDataSideblock,
    useStagingUrl,
    useStagingURLFilters,
} from 'features/staging';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Badge,
    Breadcrumbs,
    Button,
    Search,
    Select,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from 'components/ui';

import {
    useGetPipelineChildRunsQuery,
    useGetPipelineRunById,
    useGetRawDataQuery,
} from 'api/queries/staging-service';
import { IPipelineChildRun } from 'api/staging-service/types';
import { useDebounce } from 'hooks';
import * as R from 'router/const';

import { ChildPipelineRow } from './components';
import * as S from './units';
import { getChildPipelineStats } from './utils';

export const StagingPreAdapterPage = () => {
    const stagingUrl = useStagingUrl();
    const [params] = useSearchParams();
    const runId = params.get('id');
    const navigate = useNavigate();

    const {
        filters: filterValues,
        setFilters: setFilterValues,
        resetFilters,
    } = useStagingURLFilters('children');
    const countPage = filterValues.page;
    const itemsCountOnPage = filterValues.pageSize;

    const searchDebounced = useDebounce(filterValues.search);

    const { data: pipelineRun, isLoading: isPipeleneRunLoading } = useGetPipelineRunById(runId);
    const { data: childRuns, isLoading: isChildRunsLoading } = useGetPipelineChildRunsQuery(runId, {
        limit: itemsCountOnPage,
        offset: (countPage - 1) * itemsCountOnPage,
        status: filterValues.status,
        artifactQuery: encodeURIComponent(searchDebounced),
    });
    const stats = getChildPipelineStats(pipelineRun);

    const isLoading = isPipeleneRunLoading || isChildRunsLoading;

    const [selectedPipeline, setSelectedPipeline] = useState<IPipelineChildRun | null>(null);
    const { data: rawData } = useGetRawDataQuery(selectedPipeline?.rawDataRefId);

    const isResetButtonActive =
        filterValues.status !== null ||
        filterValues.type !== null ||
        filterValues.source !== null ||
        filterValues.search.length > 0;

    const handleResetButtonClick = () => {
        resetFilters();
    };

    return (
        <S.PageWrapper>
            <S.HeaderContainer>
                <Breadcrumbs>
                    <BreadCrumbsItem
                        name="Наблюдаемость запусков pipeline"
                        index={0}
                        id={0}
                        onClick={() =>
                            navigate(stagingUrl(`${R.ADMIN_PATH}${R.STAGING_PATH}`, ['runs']))
                        }
                    />
                </Breadcrumbs>

                <S.TitleContainer>
                    <Text variant="h4">{runId}</Text>
                    {pipelineRun && (
                        <Badge
                            type="secondary"
                            semantic={pipelineStatusToSemanticMap[pipelineRun.status]}
                            icon={pipelineStatusToIconMap[pipelineRun.status]}
                        >
                            {pipelineStatusToNameMap[pipelineRun.status]}
                        </Badge>
                    )}
                </S.TitleContainer>
            </S.HeaderContainer>

            {stats && (
                <S.CardsContainer>
                    <S.Card>
                        <Text variant="subtitle2">Найдено артефактов</Text>
                        <Text variant="h4">{stats.total}</Text>
                    </S.Card>
                    <S.Card>
                        <Text variant="subtitle2">Успешно</Text>
                        <S.SuccessText variant="h4">
                            {stats.success}/{stats.total}
                        </S.SuccessText>
                    </S.Card>
                    <S.Card>
                        <Text variant="subtitle2">В процессе</Text>
                        <S.InfoText variant="h4">
                            {stats.progress}/{stats.total}
                        </S.InfoText>
                    </S.Card>
                    <S.Card>
                        <Text variant="subtitle2">С ошибками</Text>
                        <S.ErrorText variant="h4">
                            {stats.error}/{stats.total}
                        </S.ErrorText>
                    </S.Card>
                </S.CardsContainer>
            )}

            <S.FiltersContainer>
                <Search
                    fullWidth
                    placeholder="Поиск по uid и названию артефакта"
                    value={filterValues.search}
                    onChange={(e) => setFilterValues({ search: e.target.value })}
                    onClear={() => setFilterValues({ search: '' })}
                />
                <Select
                    fullWidth
                    placeholder="Статус"
                    options={pipelineStatusOptions}
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
                            status: values[0]?.id ?? null,
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

            {isLoading && <Skeleton height={100} radius={12} />}

            {childRuns && childRuns.results.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataNoWrap>ID</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>UID артефакта</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Название артефакта</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Тип артефакта</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Статус</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Источник</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Запущен</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Завершён</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Длительность</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Сырые данные</S.TableHeaderDataNoWrap>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {childRuns.results.map((pipeline) => (
                            <ChildPipelineRow
                                key={pipeline.id}
                                pipeline={pipeline}
                                preAdapterRunId={runId}
                                setSelectedPipeline={setSelectedPipeline}
                            />
                        ))}

                        <TableRow>
                            <TableData colSpan={9} alignRight>
                                <TablePagination
                                    onUserActions={(e) => {
                                        setFilterValues({ page: e.page, pageSize: e.rowsPerPage });
                                    }}
                                    page={countPage}
                                    rowsCount={childRuns.totalCount}
                                    rowsPerPage={itemsCountOnPage}
                                    rowsPerPageOptions={[10, 25, 50, 100]}
                                    showFirstAndLastButtons
                                />
                            </TableData>
                        </TableRow>
                    </TableBody>
                </S.TableStyled>
            )}

            {!isLoading && childRuns && childRuns.totalCount === 0 && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Нет результатов, подходящих под параметры поиска"
                    text="Попробуйте изменить поисковой запрос"
                />
            )}

            {!isLoading && !childRuns && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Pipeline не найден"
                    text="Проверьте корректность ссылки"
                />
            )}

            <RawDataSideblock
                isOpen={!!selectedPipeline}
                onClose={() => setSelectedPipeline(null)}
                data={{
                    title: `Сырые данные`,
                    rawData: JSON.stringify(rawData, null, 2),
                }}
            />
        </S.PageWrapper>
    );
};
