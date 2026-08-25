import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    initialChildPipelineFilterValues,
    pipelineStatusOptions,
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
    RawDataSideblock,
} from 'features/staging';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Badge,
    Breadcrumbs,
    Button,
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
import * as R from 'router/const';

import { ChildPipelineRow } from './components';
import { IChildPipelineFilterValues } from './types';
import * as S from './units';
import { getChildPipelineStats } from './utils';

export const StagingPreAdapterPage = () => {
    const [params] = useSearchParams();
    const runId = params.get('id');
    const navigate = useNavigate();

    const [countPage, setCountPage] = useState(1);
    const [itemsCountOnPage, setItemsCountOnPage] = useState(10);
    const [filterValues, setFilterValues] = useState<IChildPipelineFilterValues>(
        initialChildPipelineFilterValues,
    );

    const { data: pipelineRun, isLoading: isPipeleneRunLoading } = useGetPipelineRunById(runId);
    const { data: childRuns, isLoading: isChildRunsLoading } = useGetPipelineChildRunsQuery(runId, {
        limit: itemsCountOnPage,
        offset: (countPage - 1) * itemsCountOnPage,
        status: filterValues.status,
    });
    const stats = getChildPipelineStats(pipelineRun);

    const isLoading = isPipeleneRunLoading || isChildRunsLoading;

    const [selectedPipeline, setSelectedPipeline] = useState<IPipelineChildRun | null>(null);
    const { data: rawData } = useGetRawDataQuery(selectedPipeline?.rawDataRefId);

    useEffect(() => {
        setFilterValues(initialChildPipelineFilterValues);
        setCountPage(1);
    }, [runId]);

    useEffect(() => {
        setCountPage(1);
    }, [filterValues]);

    const isResetButtonActive =
        filterValues.status !== null ||
        filterValues.type !== null ||
        filterValues.source !== null ||
        filterValues.search.length > 0;

    const handleResetButtonClick = () => {
        setFilterValues(initialChildPipelineFilterValues);
        setCountPage(1);
    };

    return (
        <S.PageWrapper>
            <S.HeaderContainer>
                <Breadcrumbs>
                    <BreadCrumbsItem
                        name="Наблюдаемость запусков pipeline"
                        index={0}
                        id={0}
                        onClick={() => navigate(`${R.ADMIN_PATH}${R.STAGING_PATH}`)}
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
                            ...filterValues,
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
                                        setCountPage(e.page);
                                        setItemsCountOnPage(e.rowsPerPage);
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
