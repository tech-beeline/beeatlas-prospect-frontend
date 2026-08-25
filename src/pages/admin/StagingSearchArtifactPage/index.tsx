import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    artifactStatusToIconMap,
    artifactStatusToNameMap,
    artifactStatusToSemanticMap,
} from 'features/staging';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Badge,
    Breadcrumbs,
    Search,
    Skeleton,
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import {
    useGetArtifactByUidQuery,
    useGetArtifactPipelinesSearchQuery,
} from 'api/queries/staging-service';
import { useDebounce } from 'hooks';
import * as R from 'router/const';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { PipelineRow } from './components';
import { LimitOptions } from './const';
import * as S from './units';

export const StagingSearchArtifactPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const uid = params.get('uid');
    const type = params.get('type');

    const { data: artifactData, isLoading: isLoadingArtifact } = useGetArtifactByUidQuery(
        uid,
        type,
    );

    const [limit, setLimit] = useState(LimitOptions.TEN);
    const limitOptions = Object.values(LimitOptions).map((value) => ({
        id: value,
        value: `Последние ${value} выгрузок`,
    }));

    const [search, setSearch] = useState('');
    const searchDebounced = useDebounce(search);

    const { data: searchData, isLoading: isLoadingSearchData } = useGetArtifactPipelinesSearchQuery(
        {
            text: encodeURI(searchDebounced),
            artifactUid: uid ?? '',
            artifactType: type ?? '',
            limit: limit,
        },
    );

    return (
        <S.PageWrapper>
            <S.Header>
                <Breadcrumbs>
                    <BreadCrumbsItem
                        name="Поиск по сущностям staging"
                        index={0}
                        id={0}
                        onClick={() => navigate(`${R.ADMIN_PATH}${R.STAGING_SEARCH_PATH}`)}
                    />
                </Breadcrumbs>
                {isLoadingArtifact && <Skeleton height={32} radius={12} width={150} />}
                {artifactData && (
                    <S.TitleContainer>
                        <Text variant="h4">{artifactData.name}</Text>
                        <Badge
                            type="secondary"
                            semantic={artifactStatusToSemanticMap[artifactData.status]}
                            icon={artifactStatusToIconMap[artifactData.status]}
                        >
                            {artifactStatusToNameMap[artifactData.status] ?? artifactData.status}
                        </Badge>
                    </S.TitleContainer>
                )}
            </S.Header>
            {isLoadingArtifact && <Skeleton radius={12} height={90} />}
            {artifactData && (
                <S.GeneralInfo>
                    <div>
                        <Text inactive variant="body3">
                            UID артефакта
                        </Text>
                        <Text variant="body2">{artifactData.extUid}</Text>
                    </div>
                    <div>
                        <Text inactive variant="body3">
                            Тип артефакта
                        </Text>
                        <Text variant="body2">{type}</Text>
                    </div>
                    <div>
                        <Text inactive variant="body3">
                            Источник
                        </Text>
                        <Text variant="body2">{formatNullableString(artifactData.sourceName)}</Text>
                    </div>
                    <div>
                        <Text inactive variant="body3">
                            Дата выгрузки
                        </Text>
                        <Text variant="body2">
                            {dayjs(formatDateToUTC(artifactData.updatedAt))
                                .local()
                                .format('DD.MM.YYYY, HH:mm')}
                        </Text>
                    </div>
                </S.GeneralInfo>
            )}
            {(isLoadingArtifact || artifactData) && (
                <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Поиск"
                        filterPlaceholder="Глубина поиска"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
                        selectedFilter={limitOptions.find((option) => option.id === limit)}
                        filterItems={limitOptions}
                        onFilterChange={(value) =>
                            setLimit((value?.id as LimitOptions) ?? LimitOptions.TEN)
                        }
                    />
                </S.SearchContainer>
            )}
            {isLoadingSearchData &&
                Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} radius={12} height={100} />
                ))}
            {searchData && (
                <>
                    <Text variant="h5">Результаты ({searchData.totalCount})</Text>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderData>Код pipeline</TableHeaderData>
                                <TableHeaderData>Дата</TableHeaderData>
                                <TableHeaderData>Статус</TableHeaderData>
                                <TableHeaderData>Результат</TableHeaderData>
                                <TableHeaderData>Кол-во вхождений</TableHeaderData>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchData.results.map((pipeline) => (
                                <PipelineRow key={pipeline.id} pipeline={pipeline} />
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
            {!isLoadingArtifact && !artifactData && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Артифакт не найден"
                    text="Проверьте корректность ссылки"
                />
            )}
        </S.PageWrapper>
    );
};
