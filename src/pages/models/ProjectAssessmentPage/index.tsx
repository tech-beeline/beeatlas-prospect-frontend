import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    AssessmentView,
    getProjectAssessmentName,
    getProjectAssessmentSemantic,
} from 'features/projects';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Badge, Breadcrumbs, Skeleton } from 'components/ui';

import { useGetAssessmentByIdQuery } from 'api/queries/projects';
import * as R from 'router/const';
import { formatDateToUTC } from 'utils/formatters';

// import { Icons } from 'styles/design-tokens/js/iconfont/icons';
// import { useSnackbarStore } from 'widgets/Snackbar';
import * as S from './units';

export const ProjectAssessmentPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    // const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const assessmentId = params.get('id');
    const { data: assessment, isLoading } = useGetAssessmentByIdQuery(assessmentId);

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

    const header = (
        <S.PageHeader>
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
                {/* <S.Actions>
                    <Button
                        size="medium"
                        startIcon={<Icon iconName={Icons.Upload} size="small" />}
                        onClick={() => showSnackbar({ message: 'Результат оценки экспортирован' })}
                    >
                        Экспорт
                    </Button>
                    <Button
                        size="medium"
                        onClick={() =>
                            showSnackbar({
                                message: 'Результат подготовлен к публикации в Confluence',
                            })
                        }
                    >
                        Публикация в Confluence
                    </Button>
                </S.Actions> */}
            </S.HeaderRow>
        </S.PageHeader>
    );

    return <AssessmentView assessment={assessment} header={header} />;
};
