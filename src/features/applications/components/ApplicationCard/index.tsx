import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { Button, Label } from 'components/ui';

import { ApplicationStatus } from 'api/applications/types';
import { usePatchBCApplicationMutation } from 'api/queries/applications';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    statusAliasesWithInfoIcon,
    statusAliasToLabelTypeMap,
    statusAliasToTooltipTextMap,
} from './const';
import { IApplicationCard } from './types';
import * as S from './units';

export const ApplicationCard: FC<IApplicationCard> = ({ application, review }) => {
    const navigate = useNavigate();

    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const { mutateAsync } = usePatchBCApplicationMutation();

    const handleAssignToSelfButtonClick = async () => {
        await mutateAsync({ id: application.businessKey, nextStatus: ApplicationStatus.RW });
        showSnackbar({ message: 'Заявка принята в работу' });
    };

    return (
        <S.Container>
            <S.Content>
                <S.TitleContainer>
                    <Text inactive variant="overline">
                        {application.type.name}
                    </Text>
                    <Text
                        link
                        pointer
                        variant="subtitle2"
                        onClick={() =>
                            navigate(
                                `${R.PROFILE_PATH}${review ? R.REVIEW_PATH : R.APPLICATIONS_PATH}${
                                    R.VIEW_PATH
                                }?key=${application.businessKey}`,
                            )
                        }
                    >
                        {application.name}
                    </Text>
                </S.TitleContainer>
                {/* <div>
                    <Text inactive variant="overline">
                        Домен
                    </Text>
                    <Text variant="body2">Отправка коммуникаций в различне каналы</Text>
                </div>
                <div>
                    <Text inactive variant="overline">
                        Исполнитель
                    </Text>
                    <Text variant="body2">{application.executorId}</Text>
                </div> */}
                <S.DatesContainer>
                    <div>
                        <Text inactive variant="overline">
                            Создана
                        </Text>
                        <Text variant="body2">
                            {dayjs(formatDateToUTC(application.createDate))
                                .local()
                                .format('DD.MM.YYYY')}
                        </Text>
                    </div>
                    <div>
                        <Text inactive variant="overline">
                            Изменена
                        </Text>
                        <Text variant="body2">
                            {application.updateDate
                                ? dayjs(formatDateToUTC(application.updateDate))
                                      .local()
                                      .format('DD.MM.YYYY')
                                : formatNullableString(null)}
                        </Text>
                    </div>
                </S.DatesContainer>
            </S.Content>
            <S.Metadata>
                <S.NumberContainer>
                    <Text variant="body2">№ {application.id}</Text>
                    <Label
                        iconName={
                            statusAliasesWithInfoIcon.includes(application.status.alias)
                                ? Icons.InfoCircled
                                : undefined
                        }
                        title={application.status.name}
                        variant="contained"
                        type={statusAliasToLabelTypeMap[application.status.alias] ?? 'default'}
                        data-tooltip-id={`label-${application.id}`}
                    />
                    <TooltipContainer noArrow place="top" offset={8} id={`label-${application.id}`}>
                        {statusAliasToTooltipTextMap[application.status.alias]}
                    </TooltipContainer>
                </S.NumberContainer>
                {/* {application.status.alias === ApplicationStatus.DN && (
                    <S.LinkContainer>
                        <Text link variant="body2">
                            Возможность в ФДМ
                        </Text>
                        <S.IconStyled iconName={Icons.Copy} />
                    </S.LinkContainer>
                )} */}
                {review && application.status.alias === ApplicationStatus.WTXCTR && (
                    <S.ButtonContainer>
                        <Button size="small" onClick={handleAssignToSelfButtonClick}>
                            Назначить на себя
                        </Button>
                    </S.ButtonContainer>
                )}
            </S.Metadata>
        </S.Container>
    );
};
