import React, { FC } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Avatar, Button, Icon } from 'components/ui';

import { useDownloadFileMutation } from 'api/queries/file-export';
import { useUpdateBusinessNotificationsMutation } from 'api/queries/notifications';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { exportNotificationTypeNames } from './const';
import { IBusinessNotificationCard } from './types';
import * as S from './units';

export const BusinessNotificationCard: FC<IBusinessNotificationCard> = ({
    businessNotification,
}) => {
    const { mutateAsync: updateBusinessNotifications } = useUpdateBusinessNotificationsMutation();
    const { mutate: downloadFile } = useDownloadFileMutation();

    const handleCardClick = () => {
        if (!businessNotification.webNotify) {
            updateBusinessNotifications([businessNotification.id]);
        }
    };

    const isExportNotification = exportNotificationTypeNames.includes(
        businessNotification.entityTypeId.name,
    );

    return (
        <S.NotificationCard
            unread={!businessNotification.webNotify}
            isExport={isExportNotification}
            onClick={handleCardClick}
        >
            <S.CardContainer>
                <S.AvatarContainer>
                    {!businessNotification.webNotify && <S.Indicator />}
                    <Avatar
                        icon={<Icon iconName={Icons.PagesMultiple} />}
                        color={isExportNotification ? 'green' : 'purple'}
                    />
                </S.AvatarContainer>

                <S.TextContainer>
                    <Text inactive variant="overline">
                        {isExportNotification ? 'ЭКСПОРТ ФАЙЛОВ' : 'МОИ ЗАЯВКИ'}
                    </Text>
                    <Text variant="body2">
                        {isExportNotification
                            ? 'Файл готов'
                            : `${businessNotification.entityTypeId.description} `}
                        {!isExportNotification && (
                            <S.BoldText>{businessNotification.name}</S.BoldText>
                        )}
                    </Text>
                    <Text inactive variant="body3">
                        {dayjs(businessNotification.createdDate).format('DD.MM.YYYY')}
                    </Text>
                    <S.LinkContainer>
                        <Text variant="subtitle3">
                            <Link
                                title="Перейти"
                                url={
                                    isExportNotification
                                        ? `${R.PROFILE_PATH}${R.EXPORT_PATH}`
                                        : `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}?id=${businessNotification.entityId}`
                                }
                            />
                        </Text>
                        {isExportNotification && (
                            <Button
                                variant="plain"
                                startIcon={<Icon iconName={Icons.Download} />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    downloadFile(businessNotification.entityId);
                                }}
                            >
                                Скачать
                            </Button>
                        )}
                    </S.LinkContainer>
                </S.TextContainer>
            </S.CardContainer>
        </S.NotificationCard>
    );
};
