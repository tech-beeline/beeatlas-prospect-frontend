import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuthStore } from 'features/auth';
import {
    getProjectAssessmentName,
    getProjectAssessmentSemantic,
    getProjectStatusName,
    getProjectStatusSemantic,
} from 'features/projects';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import {
    Autocomplete,
    Badge,
    Button,
    Search,
    Select,
    Skeleton,
    Switch,
    TableBody,
    TableData,
    TableHead,
    TablePagination,
    TableRow,
} from 'components/ui';

import { useGetEmployee } from 'api/queries/profile';
import { useGetProjectsQuery } from 'api/queries/projects';
import { useDebounce, useModal } from 'hooks';
import * as R from 'router/const';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { CreateProjectSideblock } from './components';
import { ROWS_PER_PAGE_OPTIONS, STATUS_OPTIONS } from './const';
import { EmployeeOption } from './types';
import * as S from './units';

export const ProjectsLibraryPage = () => {
    const navigate = useNavigate();
    const { modalOpened, openModal, closeModal } = useModal();
    const [search, setSearch] = useState('');
    const [statusId, setStatusId] = useState<number | null>(null);
    const [ownerId, setOwnerId] = useState<number | null>(null);
    const [onlyMine, setOnlyMine] = useState(false);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const beeatlasUserId = useAuthStore((state) => state.beeatlasUserId);

    const selectedOwnerId = onlyMine ? beeatlasUserId ?? undefined : ownerId ?? undefined;
    const { data: projects, isLoading } = useGetProjectsQuery({
        statusId: statusId ?? undefined,
        ownerId: selectedOwnerId,
    });

    const [searchEmployee, setSearchEmployee] = useState('');
    const searchEmployeeDebounced = useDebounce(searchEmployee);
    const { data: employeeData, isLoading: isLoadingEmployee } =
        useGetEmployee(searchEmployeeDebounced);
    const employeeOptions: EmployeeOption[] = (employeeData ?? []).map((employee) => ({
        id: employee.id ?? Number(employee.employeeNumber),
        value: employee.fullName,
        email: employee.email,
    }));

    const filteredProjects = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase('ru');
        if (!normalizedSearch) return projects ?? [];

        return (projects ?? []).filter(
            (project) =>
                project.name.toLocaleLowerCase('ru').includes(normalizedSearch) ||
                project.uniqueIdent.toLocaleLowerCase('ru').includes(normalizedSearch) ||
                String(project.id).includes(normalizedSearch),
        );
    }, [projects, search]);

    const visibleProjects = filteredProjects.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => setOwnerId(null), [onlyMine]);

    useEffect(() => {
        setPage(1);
    }, [search, statusId, ownerId, onlyMine]);

    const resetFilters = () => {
        setSearch('');
        setStatusId(null);
        setSearchEmployee('');
        setOwnerId(null);
        setOnlyMine(false);
        setPage(1);
    };

    const hasActiveFilters = Boolean(search || statusId || ownerId || onlyMine);

    return (
        <S.PageWrapper>
            <S.PageHeader>
                <Text variant="h4">Проекты</Text>
                <Button size="medium" variant="contained" onClick={openModal}>
                    Создать проект
                </Button>
            </S.PageHeader>

            <S.FiltersContainer>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        placeholder="Поиск по названию или ID проекта"
                        size="medium"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onClear={() => setSearch('')}
                    />
                </S.SearchContainer>
                <div />
                <div />
                <Autocomplete
                    key={ownerId}
                    fullWidth
                    label="Архитектор"
                    options={employeeOptions}
                    loading={isLoadingEmployee}
                    disabled={onlyMine}
                    loadingContent={
                        <div>
                            <Text inactive variant="subtitle3">
                                Загрузка...
                            </Text>
                        </div>
                    }
                    value={employeeOptions.find((option) => option.id === ownerId) ?? null}
                    onChange={(option) => setOwnerId(Number(option.id))}
                    onInputChange={(value) => {
                        setSearchEmployee(value);
                        setOwnerId(null);
                    }}
                    onInputClear={() => {
                        setSearchEmployee('');
                        setOwnerId(null);
                    }}
                    renderValue={(option) => option.value}
                    makeOption={(option) => (
                        <S.OptionContent>
                            <S.OptionText variant="body2">{option.value}</S.OptionText>
                            <S.OptionText inactive variant="body3">
                                {(option as EmployeeOption).email}
                            </S.OptionText>
                        </S.OptionContent>
                    )}
                    type="select"
                />
                <Select
                    fullWidth
                    disabled={isLoading}
                    options={STATUS_OPTIONS}
                    placeholder="Статус"
                    values={
                        statusId ? STATUS_OPTIONS.filter((option) => option.id === statusId) : []
                    }
                    onChange={(values) => setStatusId(values[0]?.id ?? null)}
                />
                <Switch
                    checked={onlyMine}
                    label="Мои проекты"
                    onChange={(event) => setOnlyMine(event.target.checked)}
                />
                <Button
                    disabled={!hasActiveFilters}
                    size="medium"
                    variant="plain"
                    onClick={resetFilters}
                >
                    Сбросить
                </Button>
            </S.FiltersContainer>

            {isLoading && <Skeleton height={320} radius={12} />}

            {!isLoading && visibleProjects.length > 0 && (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataNoWrap>Проект</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Статус</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Архитектор</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Оценка</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Дата изменения</S.TableHeaderDataNoWrap>
                            <S.TableHeaderDataNoWrap>Jira</S.TableHeaderDataNoWrap>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleProjects.map((project) => (
                            <TableRow dense key={project.id}>
                                <TableData>
                                    <div>
                                        <Text
                                            pointer
                                            link
                                            variant="body3"
                                            onClick={() =>
                                                navigate(
                                                    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${project.id}`,
                                                )
                                            }
                                        >
                                            {project.name}
                                        </Text>
                                        <Text inactive variant="body3">
                                            {project.uniqueIdent}
                                        </Text>
                                    </div>
                                </TableData>
                                <TableData>
                                    <Badge semantic={getProjectStatusSemantic(project.statusName)}>
                                        {getProjectStatusName(project.statusName)}
                                    </Badge>
                                </TableData>
                                <TableData>{project.ownerName}</TableData>
                                <TableData>
                                    <Badge
                                        semantic={getProjectAssessmentSemantic(project.impactLevel)}
                                    >
                                        {getProjectAssessmentName(project.impactLevel)}
                                    </Badge>
                                </TableData>
                                <TableData>
                                    {dayjs(
                                        formatDateToUTC(project.updatedDate ?? project.createdDate),
                                    )
                                        .local()
                                        .format('DD.MM.YYYY, HH:mm')}
                                </TableData>
                                <TableData>
                                    {project.docLink ? (
                                        <Link url={project.docLink} title="Ссылка" />
                                    ) : (
                                        formatNullableString(null)
                                    )}
                                </TableData>
                            </TableRow>
                        ))}
                        <TableRow dense>
                            <TableData alignRight colSpan={6}>
                                <TablePagination
                                    showFirstAndLastButtons
                                    page={page}
                                    rowsCount={filteredProjects.length}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                                    onUserActions={(actions) => {
                                        setPage(actions.page);
                                        setRowsPerPage(actions.rowsPerPage);
                                    }}
                                />
                            </TableData>
                        </TableRow>
                    </TableBody>
                </S.TableStyled>
            )}

            {!isLoading && filteredProjects.length === 0 && (
                <S.EmptyContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text="Попробуйте изменить параметры поиска"
                        title="Проекты не найдены"
                    />
                </S.EmptyContainer>
            )}

            <CreateProjectSideblock isOpen={modalOpened} onClose={closeModal} />
        </S.PageWrapper>
    );
};
