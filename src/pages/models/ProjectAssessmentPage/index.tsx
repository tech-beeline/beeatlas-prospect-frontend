import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    AssessmentView,
    getProjectAssessmentName,
    getProjectAssessmentSemantic,
    PublishSideblock,
} from 'features/projects';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Badge, Banner, Breadcrumbs, Button, Icon, Skeleton } from 'components/ui';

import { StructureRequirementType } from 'api/projects';
import {
    useExportAssessmentMutation,
    useGetAssessmentByIdQuery,
    usePublishAssessmentMutation,
} from 'api/queries/projects';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { formatDateToUTC } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { getAssessmentErrorMessage } from '../ProjectAssessmentAddPage/errors';

import * as S from './units';

export const ProjectAssessmentPage = () => {
    const [publicationOpened, setPublicationOpened] = useState(false);
    const [pageName, setPageName] = useState('');
    const [parentUrl, setParentUrl] = useState('');
    const [pat, setPat] = useState('');
    const [publishedUrl, setPublishedUrl] = useState('');
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const assessmentId = params.get('id');
    const { data: assessment, isLoading } = useGetAssessmentByIdQuery(assessmentId);
    const exportMutation = useExportAssessmentMutation();
    const publishMutation = usePublishAssessmentMutation();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const navigateToProjects = () => navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}`);
    const navigateToProject = () => {
        if (assessment) {
            navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${assessment.projectId}`);
        }
    };

    if (isLoading) {
        return (
            <S.LoadingWrapper>
                <Skeleton height={120} radius={12} />
                <Skeleton height={420} radius={12} />
            </S.LoadingWrapper>
        );
    }

    if (!assessment) {
        return (
            <S.NotFoundPage>
                <NotFoundBlock
                    buttonProps={{ onClick: navigateToProjects }}
                    buttonText="К списку проектов"
                    imageVariant={ImageVariants.QUESTION_BOX}
                    text="Проверьте адрес или вернитесь в библиотеку проектов"
                    title="Оценка не найдена"
                />
            </S.NotFoundPage>
        );
    }

    const structuredRequirements = [
        ...assessment.reqFunc.map(({ uniqueIdent, title, description }) => ({
            id: uniqueIdent,
            title,
            description,
            type: StructureRequirementType.FR,
        })),
        ...assessment.reqNonFunc.map(({ uniqueIdent, title, description }) => ({
            id: uniqueIdent,
            title,
            description,
            type: StructureRequirementType.NFR,
        })),
        ...assessment.openQuestions.map(({ uniqueIdent, questionText }) => ({
            id: uniqueIdent,
            title: questionText,
            description: '',
            type: StructureRequirementType.OQ,
        })),
    ];
    const impactTcs = [
        ...assessment.tc.map((capability) => ({
            code: capability.tcCode,
            name: capability.tcCode,
            description: '',
            action: 'reuse',
            source: 'landscape',
            fr_ids: capability.frIds,
            system: { code: capability.productAlias, name: capability.productName },
            parent_bc: { code: capability.parentBcCode, name: capability.parentBcCode },
        })),
        ...assessment.designTc.map((capability) => ({
            code: String(capability.id),
            name: capability.name,
            description: capability.description,
            action: 'create_new',
            source: 'new',
            fr_ids: capability.frIds,
            system: { code: capability.productAlias, name: capability.productName },
            parent_bc: { code: capability.parentBcCode, name: capability.parentBcCode },
        })),
    ];
    const payload = {
        title: assessment.projectName,
        source: assessment.source,
        source_url: assessment.sourceUrl || undefined,
        structured_requirements: structuredRequirements,
        task_description: assessment.taskDescription,
        impact_level: assessment.impactLevel,
        impact_tcs: impactTcs,
    };

    const exportAssessment = async () => {
        try {
            const file = await exportMutation.mutateAsync(payload);
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = `hld-report-${assessment.projectId}.md`;
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch {
            // Ошибка отображается в Banner.
        }
    };

    const openPublication = () => {
        setPageName((currentPageName) => currentPageName || assessment.projectName);
        setPublicationOpened(true);
    };

    const publishAssessment = async () => {
        try {
            const result = await publishMutation.mutateAsync({
                ...payload,
                page_title: pageName,
                parent_page_url: parentUrl,
                pat,
            });
            setPublishedUrl(result.confluence_url);
            setPublicationOpened(false);
            showSnackbar({ message: 'Оценка опубликована' });
        } catch {
            // Ошибка отображается в Banner внутри формы публикации.
        }
    };

    const header = (
        <S.PageHeader>
            {exportMutation.error && (
                <Banner color="error" title={getAssessmentErrorMessage(exportMutation.error)} />
            )}
            {publishedUrl && (
                <a href={publishedUrl} target="_blank" rel="noreferrer">
                    Открыть опубликованный отчёт
                </a>
            )}
            <Breadcrumbs>
                <BreadCrumbsItem name="Проекты" index={0} id={0} onClick={navigateToProjects} />
                <BreadCrumbsItem
                    name={assessment.projectName}
                    index={1}
                    id={assessment.projectId}
                    onClick={navigateToProject}
                />
            </Breadcrumbs>

            <S.HeaderRow>
                <S.TitleGroup>
                    <Text variant="h4">
                        Оценка от{' '}
                        {dayjs(formatDateToUTC(assessment.createdDate))
                            .local()
                            .format('DD.MM.YYYY, HH:mm')}
                    </Text>
                    <Badge semantic={getProjectAssessmentSemantic(assessment.impactLevel)}>
                        {getProjectAssessmentName(assessment.impactLevel)}
                    </Badge>
                </S.TitleGroup>
                <S.Actions>
                    <Button
                        size="small"
                        startIcon={<Icon iconName={Icons.Download} />}
                        variant="outlined"
                        disabled={exportMutation.isPending}
                        onClick={exportAssessment}
                    >
                        Экспорт
                    </Button>
                    <Button size="small" variant="contained" onClick={openPublication}>
                        Публикация в Confluence
                    </Button>
                </S.Actions>
            </S.HeaderRow>
        </S.PageHeader>
    );

    return (
        <>
            <AssessmentView assessment={assessment} header={header} />
            <PublishSideblock
                isOpen={publicationOpened}
                isPending={publishMutation.isPending}
                ownerName={assessment.ownerName}
                pageName={pageName}
                parentUrl={parentUrl}
                pat={pat}
                sourceUrl={assessment.sourceUrl}
                businessDescription={assessment.rawText}
                errorMessage={
                    publishMutation.error
                        ? getAssessmentErrorMessage(publishMutation.error)
                        : undefined
                }
                onClose={() => setPublicationOpened(false)}
                onPublish={publishAssessment}
                onPageNameChange={setPageName}
                onParentUrlChange={setParentUrl}
                onPatChange={setPat}
            />
        </>
    );
};
