import React, { FC, useState } from 'react';
import { AssessmentView } from 'features/projects';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Banner, Button, Icon, IconButton, TextArea, TextField } from 'components/ui';

import { StructureRequirementType } from 'api/projects';
import { useExportAssessmentMutation, usePublishAssessmentMutation } from 'api/queries/projects';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { getAssessmentErrorMessage as getErrorMessage } from '../../errors';
import { buildImpact } from '../../impact';
import { ProcessingState } from '../ProcessingState';
import { StepFooter } from '../StepFooter';

import { IAssessmentResultStepProps } from './types';
import * as S from './units';

export const AssessmentResultStep: FC<IAssessmentResultStepProps> = ({
    savedData,
    setSavedData,
    project,
    processState,
    progress,
    impactLevel,
    onBack,
}) => {
    const [publicationOpened, setPublicationOpened] = useState(false);
    const { pageName, parentUrl } = savedData;
    const [pat, setPat] = useState(savedData.confluencePat);
    const [publishedUrl, setPublishedUrl] = useState('');
    const exportMutation = useExportAssessmentMutation();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const publishMutation = usePublishAssessmentMutation();

    const functionalRequirements = savedData.requirements.filter(
        ({ type }) => type === StructureRequirementType.FR,
    );
    const nonFunctionalRequirements = savedData.requirements.filter(
        ({ type }) => type === StructureRequirementType.NFR,
    );
    const openQuestions = savedData.requirements.filter(
        ({ type }) => type === StructureRequirementType.OQ,
    );
    const includedCapabilities = savedData.technicalCapabilities.filter(
        ({ decision }) => decision === 'reused' || decision === 'new',
    );
    const { systems, tcs } = buildImpact(savedData.technicalCapabilities);

    if (processState !== 'done') {
        return (
            <S.StepLayout>
                <S.ResultScroll>
                    <ProcessingState
                        title="Формирую оценку влияния"
                        description="Учитываю выбранные технические возможности и затронутые системы"
                        progress={progress}
                        metrics={[
                            {
                                label: 'Технические возможности',
                                value: includedCapabilities.length,
                            },
                            { label: 'Затронутые системы', value: systems.length },
                        ]}
                    />
                </S.ResultScroll>
                <StepFooter onBack={onBack} />
            </S.StepLayout>
        );
    }

    const payload = {
        title: project.name,
        source: savedData.confluenceUrl ? 'confluence' : 'text',
        source_url: savedData.confluenceUrl || undefined,
        structured_requirements: savedData.requirements,
        task_description: savedData.taskDescription,
        impact_level: impactLevel,
        impact_tcs: tcs,
    };

    const exportAssessment = async () => {
        try {
            const file = await exportMutation.mutateAsync(payload);
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = `hld-report-${project.id}.md`;
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch {
            // Ошибка отображается в форме.
        }
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

    const assessment = {
        impactLevel,
        reqFunc: functionalRequirements.map(({ id, title, description }) => ({
            id,
            uniqueIdent: id,
            title,
            description,
        })),
        reqNonFunc: nonFunctionalRequirements.map(({ id, title, description }) => ({
            id,
            uniqueIdent: id,
            title,
            description,
        })),
        openQuestions: openQuestions.map(({ id, title }) => ({
            id,
            uniqueIdent: id,
            questionText: title,
        })),
        tc: tcs
            .filter(({ action }) => action === 'reuse')
            .map((capability, index) => ({
                id: `${capability.code}-${index}`,
                tcCode: capability.code,
                name: capability.name,
                description: capability.description,
                relevance: capability.relevance,
                productAlias: capability.system?.code ?? '',
                productName: capability.system?.name ?? '',
                parentBcCode: capability.parent_bc?.code ?? '',
                frIds: capability.fr_ids,
            })),
        designTc: tcs
            .filter(({ action }) => action === 'create_new')
            .map((capability, index) => ({
                id: `${capability.code}-${index}`,
                name: capability.name,
                description: capability.description,
                relevance: capability.relevance,
                productAlias: capability.system?.code ?? '',
                productName: capability.system?.name ?? '',
                parentBcCode: capability.parent_bc?.code ?? '',
                frIds: capability.fr_ids,
            })),
    };

    return (
        <S.StepLayout>
            <S.ResultScroll>
                {exportMutation.error && (
                    <Banner color="error" title={getErrorMessage(exportMutation.error)} />
                )}
                {publishedUrl && (
                    <a href={publishedUrl} target="_blank" rel="noreferrer">
                        Открыть опубликованный отчёт
                    </a>
                )}
                <AssessmentView assessment={assessment} />
            </S.ResultScroll>
            <S.Footer>
                <S.FooterContent>
                    <Button size="medium" variant="outlined" onClick={onBack}>
                        Назад
                    </Button>
                    <Button
                        size="medium"
                        startIcon={<Icon iconName={Icons.Download} />}
                        variant="outlined"
                        disabled={exportMutation.isPending}
                        onClick={exportAssessment}
                    >
                        Экспорт
                    </Button>
                    <Button
                        size="medium"
                        variant="contained"
                        onClick={() => setPublicationOpened(true)}
                    >
                        Публикация в Confluence
                    </Button>
                </S.FooterContent>
            </S.Footer>

            <SideBlock
                large
                hasBackdrop
                isOpen={publicationOpened}
                onClose={() => setPublicationOpened(false)}
            >
                <S.PublicationLayout>
                    <S.PublicationContent>
                        <S.PublicationHeader>
                            <div>
                                <Text variant="h5">Публикация в Confluence</Text>
                                <Text inactive variant="body3">
                                    Опубликовать HLD-отчёт как дочернюю страницу Confluence.
                                </Text>
                            </div>
                            <IconButton
                                aria-label="Закрыть публикацию"
                                iconName={Icons.Close}
                                size="large"
                                onClick={() => setPublicationOpened(false)}
                            />
                        </S.PublicationHeader>
                        {publishMutation.error && (
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title={getErrorMessage(publishMutation.error)}
                            />
                        )}
                        <TextField
                            fullWidth
                            disabled
                            label="Автор проведения оценки"
                            value={project.ownerName}
                        />
                        <TextField
                            fullWidth
                            label="Название страницы*"
                            value={pageName}
                            onChange={(event) =>
                                setSavedData((data) => ({ ...data, pageName: event.target.value }))
                            }
                        />
                        <TextField
                            fullWidth
                            label="URL родительской страницы*"
                            value={parentUrl}
                            onChange={(event) =>
                                setSavedData((data) => ({ ...data, parentUrl: event.target.value }))
                            }
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Персональный токен доступа (PAT)*"
                            value={pat}
                            onChange={(event) => setPat(event.target.value)}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Ссылка на бизнес-постановку в Confluence"
                            value={savedData.confluenceUrl}
                        />
                        <TextArea
                            fullWidth
                            disabled
                            label="Бизнес-постановка"
                            rows={5}
                            value={savedData.businessDescription}
                        />
                    </S.PublicationContent>
                    <S.PublicationFooter>
                        <Button
                            fullWidth
                            size="medium"
                            variant="outlined"
                            onClick={() => setPublicationOpened(false)}
                        >
                            Закрыть
                        </Button>
                        <Button
                            fullWidth
                            disabled={
                                publishMutation.isPending ||
                                !pageName.trim() ||
                                !parentUrl.trim() ||
                                !pat.trim()
                            }
                            size="medium"
                            variant="contained"
                            onClick={publishAssessment}
                        >
                            Опубликовать
                        </Button>
                    </S.PublicationFooter>
                </S.PublicationLayout>
            </SideBlock>
        </S.StepLayout>
    );
};
