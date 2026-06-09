import React, { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Button, Divider, Label, Skeleton } from 'components/ui';

import { ApplicationStatus } from 'api/applications/types';
import {
    useGetApplicationByBusinessKeyOrIdQuery,
    usePatchBCApplicationMutation,
} from 'api/queries/applications';
import { useModal } from 'hooks';
import { DenySideblock, RevisionSideblock } from 'pages/profile/ApplicationViewPage/components';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    editableStatusAliases,
    reviewButtonsStatusAliases,
    statusAliasesWithInfoIcon,
    statusAliasToLabelTypeMap,
    statusAliasToTooltipTextMap,
} from './const';
import { IApplicationViewPage } from './types';
import * as S from './units';

export const ApplicationViewPage: FC<IApplicationViewPage> = ({ review }) => {
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const paramKey = params.get('key');
    const paramId = params.get('id');

    const {
        openModal: openRevisionSideblock,
        closeModal: closeRevisionSideblock,
        modalOpened: revisionSideblockOpened,
    } = useModal();

    const {
        openModal: openDenySideblock,
        closeModal: closeDenySideblock,
        modalOpened: denySideblockOpened,
    } = useModal();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: patchApplication } = usePatchBCApplicationMutation();

    const { data: applicationData, isLoading: isLoadingApplicationData } =
        useGetApplicationByBusinessKeyOrIdQuery(paramKey, paramId);

    const handleBackIconClick = () => {
        navigate(`${R.PROFILE_PATH}${review ? R.REVIEW_PATH : R.APPLICATIONS_PATH}`);
    };

    const handleEditButtonClick = () => {
        if (applicationData) {
            navigate(
                `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.EDIT_PATH}?key=${applicationData.business_key}`,
            );
        }
    };

    const handleApproveButtonClick = async () => {
        if (applicationData) {
            navigate(
                `${R.PROFILE_PATH}${R.REVIEW_PATH}${R.EDIT_PATH}?key=${applicationData.business_key}`,
            );
        }
    };

    const handleAssignToSelfButtonClick = async () => {
        if (applicationData) {
            await patchApplication({
                id: applicationData.business_key,
                nextStatus: ApplicationStatus.RW,
            });
            showSnackbar({ message: 'Заявка принята в работу' });
        }
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <IconButton onClick={handleBackIconClick} iconName={Icons.ArrowLeft} size="large" />
                <Text variant="body2">Назад</Text>
            </S.Header>
            {isLoadingApplicationData && (
                <S.Content>
                    <S.ContentContainer>
                        <Skeleton height={300} radius={16} />
                    </S.ContentContainer>
                </S.Content>
            )}
            {applicationData && (
                <>
                    <S.Content>
                        <S.ContentContainer>
                            <S.TitleContainer>
                                <Text variant="h4">{applicationData.type.name}</Text>
                                <Label
                                    iconName={
                                        statusAliasesWithInfoIcon.includes(
                                            applicationData.status.alias,
                                        )
                                            ? Icons.InfoCircled
                                            : undefined
                                    }
                                    title={applicationData.status.name}
                                    variant="contained"
                                    type={
                                        statusAliasToLabelTypeMap[applicationData.status.alias] ??
                                        'default'
                                    }
                                    data-tooltip-id={`label-${applicationData.id}`}
                                />
                                <TooltipContainer
                                    noArrow
                                    place="top"
                                    offset={8}
                                    id={`label-${applicationData.id}`}
                                >
                                    {statusAliasToTooltipTextMap[applicationData.status.alias]}
                                </TooltipContainer>
                            </S.TitleContainer>
                            <S.InfoContainer>
                                <S.MetadataContainer>
                                    <div>
                                        <Text inactive variant="body3">
                                            Дата создания
                                        </Text>
                                        <Text variant="body2">
                                            {dayjs(formatDateToUTC(applicationData.create_date))
                                                .local()
                                                .format('DD.MM.YYYY в HH:mm')}
                                        </Text>
                                    </div>
                                    <div>
                                        <Text inactive variant="body3">
                                            Дата изменения
                                        </Text>
                                        <Text variant="body2">
                                            {applicationData.update_date
                                                ? dayjs(
                                                      formatDateToUTC(applicationData.update_date),
                                                  )
                                                      .local()
                                                      .format('DD.MM.YYYY в HH:mm')
                                                : formatNullableString(null)}
                                        </Text>
                                    </div>
                                    <div>
                                        <Text inactive variant="body3">
                                            Номер заявки
                                        </Text>
                                        <Text variant="body2">{applicationData.id}</Text>
                                    </div>
                                </S.MetadataContainer>
                                {applicationData.entity.mutable && (
                                    <S.LinkContainer
                                        onClick={() =>
                                            window.open(
                                                `${R.MODELS_PATH}${R.FDM_PATH}?id=${
                                                    applicationData.entity.mutable!.id
                                                }&type=BUSINESS`,
                                            )
                                        }
                                    >
                                        <Text pointer link variant="body2">
                                            Текущее представление в ФДМ
                                        </Text>
                                        <S.IconStyled iconName={Icons.OpenInBrowser} />
                                    </S.LinkContainer>
                                )}
                            </S.InfoContainer>
                            <Text variant="subtitle1">Атрибуты</Text>
                            <div>
                                <Text inactive variant="body3">
                                    Название
                                </Text>
                                <Text variant="body2">{applicationData.entity.name}</Text>
                            </div>
                            <div>
                                <Text inactive variant="body3">
                                    Определение
                                </Text>
                                <Text variant="body2">{applicationData.entity.description}</Text>
                            </div>
                            <div>
                                <Text inactive variant="body3">
                                    Родительская возможность
                                </Text>
                                <Text variant="body2">{applicationData.entity.parent.name}</Text>
                            </div>
                            <div>
                                <Text inactive variant="body3">
                                    Владелец возможности
                                </Text>
                                <Text variant="body2">{applicationData.entity.owner}</Text>
                            </div>
                            <Text variant="subtitle1">Исполнитель</Text>
                            <Text variant="body2">
                                {formatNullableString(applicationData.executor?.fullName)}
                            </Text>
                            <Text variant="subtitle1">Комментарии к заявке</Text>
                            <S.CommentsContainer>
                                {applicationData.comments.map((comment, i) => (
                                    <>
                                        <div key={comment.id}>
                                            <Text inactive variant="body3">
                                                {comment.fullName}, добавил комментарий{' '}
                                                {dayjs(formatDateToUTC(comment.createdDate))
                                                    .local()
                                                    .format('DD.MM.YYYY в HH:mm')}
                                            </Text>
                                            <Text variant="body2">{comment.comment}</Text>
                                        </div>
                                        {i !== applicationData.comments.length - 1 && <Divider />}
                                    </>
                                ))}
                                {applicationData.comments.length === 0 && (
                                    <S.NoComments>
                                        <Text variant="body2">Нет комментариев</Text>
                                    </S.NoComments>
                                )}
                            </S.CommentsContainer>

                            {/* @TODO: Scroll issue */}
                            <S.EmptyDiv />
                        </S.ContentContainer>
                    </S.Content>
                    {!review && editableStatusAliases.includes(applicationData.status.alias) && (
                        <S.Footer>
                            <S.ButtonContainer>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    onClick={handleEditButtonClick}
                                >
                                    Редактировать
                                </Button>
                            </S.ButtonContainer>
                        </S.Footer>
                    )}
                    {review && reviewButtonsStatusAliases.includes(applicationData.status.alias) && (
                        <S.Footer>
                            <S.ButtonContainer>
                                {applicationData.status.alias === ApplicationStatus.WTXCTR && (
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        onClick={handleAssignToSelfButtonClick}
                                    >
                                        Назначить себя
                                    </Button>
                                )}
                                {applicationData.status.alias === ApplicationStatus.RW && (
                                    <>
                                        <Button size="medium" onClick={openRevisionSideblock}>
                                            Вернуть на доработку
                                        </Button>
                                        <Button size="medium" onClick={openDenySideblock}>
                                            Отклонить
                                        </Button>
                                        <Button
                                            size="medium"
                                            variant="contained"
                                            onClick={handleApproveButtonClick}
                                        >
                                            Согласовать
                                        </Button>
                                    </>
                                )}
                            </S.ButtonContainer>
                        </S.Footer>
                    )}
                </>
            )}
            {applicationData && (
                <>
                    <DenySideblock
                        isOpen={denySideblockOpened}
                        onClose={closeDenySideblock}
                        application={applicationData}
                    />
                    <RevisionSideblock
                        isOpen={revisionSideblockOpened}
                        onClose={closeRevisionSideblock}
                        application={applicationData}
                    />
                </>
            )}
        </S.PageWrapper>
    );
};
