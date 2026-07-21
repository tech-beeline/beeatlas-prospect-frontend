import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    ChronologyTable,
    noticeLevelToNameMap,
    noticeLevelToSemanticMap,
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
    Search,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from 'components/ui';

import {
    useGetPipelineAnnotationsQuery,
    useGetPipelineRunDetailsQuery,
    useGetRawDataQuery,
} from 'api/queries/staging-service';
import { useDebounce } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import * as S from './units';

export const StagingSearchPipelinePage = () => {
    const [params] = useSearchParams();
    const pipelineId = params.get('id');
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const searchDebounced = useDebounce(search);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedRawDataRefId, setSelectedRawDataRefId] = useState<number | null>(null);
    const { data: rawData } = useGetRawDataQuery(selectedRawDataRefId);

    const { data: pipelineDetails, isLoading: isLoadingPipelineDetails } =
        useGetPipelineRunDetailsQuery(pipelineId);
    const { data: annotations, isLoading: isLoadingAnnotations } = useGetPipelineAnnotationsQuery({
        pipelineId,
        search: encodeURI(searchDebounced),
        limit: rowsPerPage,
        offset: (page - 1) * rowsPerPage,
    });

    const resetFilters = () => {
        setSearch('');
        setPage(1);
    };

    const hasActiveFilters = Boolean(search);

    return (
        <S.PageWrapper>
            <S.HeaderContainer>
                {pipelineDetails && (
                    <Breadcrumbs>
                        <BreadCrumbsItem
                            name="Поиск по сущностям staging"
                            index={0}
                            id={0}
                            onClick={() => navigate(`${R.ADMIN_PATH}${R.STAGING_SEARCH_PATH}`)}
                        />
                        <BreadCrumbsItem
                            name={pipelineDetails.artifactName}
                            index={1}
                            id={1}
                            onClick={() =>
                                navigate(
                                    `${R.ADMIN_PATH}${R.STAGING_SEARCH_PATH}${R.ARTIFACT_PATH}?uid=${pipelineDetails.artifactUid}&type=${pipelineDetails.artifactType}`,
                                )
                            }
                        />
                    </Breadcrumbs>
                )}

                <S.TitleContainer>
                    <Text variant="h4">{pipelineDetails?.id ?? pipelineId}</Text>
                    {pipelineDetails && (
                        <Badge
                            type="secondary"
                            semantic={pipelineStatusToSemanticMap[pipelineDetails.status]}
                            icon={pipelineStatusToIconMap[pipelineDetails.status]}
                        >
                            {pipelineStatusToNameMap[pipelineDetails.status]}
                        </Badge>
                    )}
                    {isLoadingPipelineDetails && <Skeleton height={32} radius={12} width={120} />}
                </S.TitleContainer>
            </S.HeaderContainer>

            {isLoadingPipelineDetails && <Skeleton height={126} radius={12} />}

            {pipelineDetails && (
                <>
                    <ChronologyTable pipelineDetails={pipelineDetails} />

                    <Text variant="h5">Аннотации</Text>

                    <S.FiltersContainer>
                        <Search
                            fullWidth
                            placeholder="Название"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPage(1);
                            }}
                            onClear={() => {
                                setSearch('');
                                setPage(1);
                            }}
                        />
                        <Button
                            disabled={!hasActiveFilters}
                            variant="plain"
                            size="medium"
                            onClick={resetFilters}
                        >
                            Сбросить
                        </Button>
                    </S.FiltersContainer>

                    {isLoadingAnnotations && <Skeleton height={400} radius={12} />}
                    {annotations && annotations.results.length > 0 && (
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <S.TableHeaderDataStyled>Уровень</S.TableHeaderDataStyled>
                                    <S.TableHeaderDataStyled>Код</S.TableHeaderDataStyled>
                                    <S.TableHeaderDataStyled>Сырые данные</S.TableHeaderDataStyled>
                                    <S.TableHeaderDataStyled>Детали</S.TableHeaderDataStyled>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {annotations.results.map((annotation) => (
                                    <TableRow key={annotation.id}>
                                        <TableData>
                                            <Badge
                                                type="secondary"
                                                semantic={
                                                    noticeLevelToSemanticMap[annotation.level]
                                                }
                                            >
                                                {noticeLevelToNameMap[annotation.level]}
                                            </Badge>
                                        </TableData>
                                        <TableData>{annotation.code}</TableData>
                                        <TableData>
                                            <Text
                                                link
                                                pointer
                                                variant="body3"
                                                onClick={() =>
                                                    setSelectedRawDataRefId(annotation.rawDataRefId)
                                                }
                                            >
                                                Посмотреть
                                            </Text>
                                        </TableData>
                                        <TableData>
                                            <Text variant="body3">
                                                {formatNullableString(annotation.details)}
                                            </Text>
                                        </TableData>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableData colSpan={4} alignRight>
                                        <TablePagination
                                            onUserActions={(event) => {
                                                setPage(event.page);
                                                setRowsPerPage(event.rowsPerPage);
                                            }}
                                            page={page}
                                            rowsCount={annotations.totalCount}
                                            rowsPerPage={rowsPerPage}
                                            rowsPerPageOptions={[10, 25, 50, 100]}
                                            showFirstAndLastButtons
                                        />
                                    </TableData>
                                </TableRow>
                            </TableBody>
                        </S.TableStyled>
                    )}

                    {!isLoadingAnnotations && annotations?.totalCount === 0 && (
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Нет результатов, подходящих под параметры поиска"
                            text="Попробуйте изменить поисковой запрос"
                        />
                    )}
                </>
            )}

            {!isLoadingPipelineDetails && !pipelineDetails && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Pipeline не найден"
                    text="Проверьте корректность ссылки"
                />
            )}

            <RawDataSideblock
                isOpen={!!selectedRawDataRefId}
                onClose={() => setSelectedRawDataRefId(null)}
                data={{ title: 'Сырые данные', rawData: JSON.stringify(rawData, null, 2) }}
            />
        </S.PageWrapper>
    );
};
