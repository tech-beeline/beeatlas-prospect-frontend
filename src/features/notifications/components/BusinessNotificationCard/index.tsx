import React, { FC } from 'react';
import { Avatar, Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { useDownloadFileMutation } from 'api/queries/file-export';
import { useUpdateBusinessNotificationsMutation } from 'api/queries/notifications';
import * as R from 'router/const';

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

    return (
        <S.NotificationCard unread={!businessNotification.webNotify} onClick={handleCardClick}>
            <S.CardContainer>
                <S.AvatarContainer>
                    {!businessNotification.webNotify && <S.Indicator />}
                    <Avatar iconName={Icons.PagesMultiple} color="green" />
                </S.AvatarContainer>

                <S.TextContainer>
                    <Text inactive variant="overline">
                        ЭКСПОРТ ФАЙЛОВ
                    </Text>
                    <Text variant="body2">Файл готов</Text>
                    <Text inactive variant="body3">
                        {dayjs(businessNotification.createdDate).format('DD.MM.YYYY')}
                    </Text>
                    <S.LinkContainer>
                        <Text variant="subtitle3">
                            <Link title="Перейти" url={`${R.PROFILE_PATH}${R.EXPORT_PATH}`} />
                        </Text>
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
                    </S.LinkContainer>
                </S.TextContainer>
            </S.CardContainer>
        </S.NotificationCard>
    );
};
