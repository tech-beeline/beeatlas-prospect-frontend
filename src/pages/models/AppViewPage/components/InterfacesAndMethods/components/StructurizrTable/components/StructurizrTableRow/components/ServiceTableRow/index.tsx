import React, { FC, useEffect, useRef, useState } from 'react';
import {
    IconButton,
    Label,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';

import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedInerfacesIdsQuery,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IServiceTableRow } from './types';
import * as S from './units';

export const ServiceTableRow: FC<IServiceTableRow> = ({ structurizrInterface, selectedEntity }) => {
    const [isNotificationIconHovered, setIsNotificationIconHovered] = useState(false);

    const rowRef = useRef<HTMLDivElement | null>(null);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { modalOpened, openModal, closeModal } = useModal();
    const { mutateAsync: createSubscription } = useCreateSubscriptionMutation();
    const { mutateAsync: deleteSubscrition } = useDeleteSubscriptionMutation();
    const { data: subscribedInterfacesIds } = useGetSubscribedInerfacesIdsQuery();
    const [isExpanded, setIsExpanded] = useState(false);

    const isSubscribed = Boolean(subscribedInterfacesIds?.includes(structurizrInterface.id));

    const handleUnsubscribe = async () => {
        await deleteSubscrition({
            entityType: SubscriptionEntityVariants.ARCH_INTERFACE,
            id: structurizrInterface.id,
        });
        closeModal();
        showSnackbar({
            message: 'Вы отписаны от уведомлений',
        });
    };

    const handleNotificationButtonClick = async (e: MouseEvent) => {
        e.stopPropagation();
        if (isSubscribed) {
            openModal();
        } else {
            await createSubscription({
                entityType: SubscriptionEntityVariants.ARCH_INTERFACE,
                id: structurizrInterface.id,
                name: structurizrInterface.code ?? '',
            });
            showSnackbar({
                message:
                    'Вы подписались на изменения интерфейса. Уведомления будут отображаться на витрине ФДМ',
            });
        }
    };

    useEffect(() => {
        if (
            selectedEntity &&
            structurizrInterface.operations.map((i) => i.id).includes(Number(selectedEntity.id))
        ) {
            setIsExpanded(true);
        }
    }, [selectedEntity]);

    const structurizrOperationsFiltered =
        selectedEntity && selectedEntity.interfaceId === structurizrInterface.id
            ? structurizrInterface.operations.filter((o) => o.id === selectedEntity.id)
            : structurizrInterface.operations;

    return (
        <>
            <div ref={rowRef} />
            <TableRow>
                <S.TableDataFullWidth colSpan={2}>
                    <S.DataContainer>
                        <S.NameContainer>
                            <IconButton
                                size="medium"
                                iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                onClick={() => setIsExpanded(!isExpanded)}
                            />
                            {structurizrInterface.name}
                        </S.NameContainer>
                        <IconButton
                            iconName={
                                isSubscribed && structurizrInterface.id
                                    ? Icons.NotificationOff
                                    : Icons.Notification
                            }
                            size="large"
                            onClick={(e) => handleNotificationButtonClick(e as any)}
                            onMouseEnter={() => setIsNotificationIconHovered(true)}
                            onMouseLeave={() => setIsNotificationIconHovered(false)}
                            data-tooltip-id={`notification-${structurizrInterface.id}`}
                        />
                        {/* <Link
                            showOuterIcon
                            showIconPermanently
                            url="https://beeline.ru"
                            title="Влияние сервиса"
                        /> */}
                    </S.DataContainer>
                </S.TableDataFullWidth>
                <TableData>
                    {
                        <Label
                            title={structurizrInterface.deletedDate ? 'Удален' : 'Активен'}
                            type={structurizrInterface.deletedDate ? 'error' : 'success'}
                        />
                    }
                </TableData>
                <TableData alignRight>{structurizrInterface.operations.length}</TableData>
                <TableData colSpan={4} alignRight>
                    {structurizrInterface.operations.length}
                </TableData>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={6}>
                        <S.ServiceContainer>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Код</TableHeaderData>
                                        <TableHeaderData>Протокол</TableHeaderData>
                                        <TableHeaderData>Версия</TableHeaderData>
                                        <TableHeaderData>Спецификация API</TableHeaderData>
                                        <TableHeaderData>
                                            Техническая&nbsp;возможность
                                        </TableHeaderData>
                                        <TableHeaderData>Дата&nbsp;изменения</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableData>
                                            {formatNullableString(structurizrInterface.code)}
                                        </TableData>
                                        <TableData>
                                            {formatNullableString(structurizrInterface.protocol)}
                                        </TableData>
                                        <TableData>
                                            {formatNullableString(structurizrInterface.version)}
                                        </TableData>
                                        <TableData>
                                            {structurizrInterface.specLink ? (
                                                <Link url={structurizrInterface.specLink} />
                                            ) : (
                                                formatNullableString(null)
                                            )}
                                        </TableData>
                                        <TableData>
                                            {structurizrInterface.techCapability ? (
                                                <Link
                                                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${structurizrInterface.techCapability.id}&type=TECH`}
                                                    title={structurizrInterface.techCapability.name}
                                                />
                                            ) : (
                                                formatNullableString(null)
                                            )}
                                        </TableData>
                                        <TableData>
                                            {dayjs(
                                                structurizrInterface.updateDate ??
                                                    structurizrInterface.createDate,
                                            )
                                                .local()
                                                .format('DD.MM.YYYY\u00A0HH:mm')}
                                        </TableData>
                                    </TableRow>
                                </TableBody>
                            </S.TableStyled>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Метод</TableHeaderData>
                                        <TableHeaderData>Описание</TableHeaderData>
                                        <TableHeaderData>Техническая возможность</TableHeaderData>
                                        <TableHeaderData alignRight>RPS</TableHeaderData>
                                        <TableHeaderData alignRight>Latency, ms</TableHeaderData>
                                        <TableHeaderData alignRight>Error Rate, %</TableHeaderData>
                                        <TableHeaderData>Статус</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {structurizrOperationsFiltered.map((operation, i) => (
                                        <TableRow key={i}>
                                            <S.TableDataFullWidth>
                                                <S.MethodNameContainer>
                                                    {`${operation.type} ${operation.name}`}
                                                    {/* <IconButton
                                                    data-tooltip-id={`method-${i}`}
                                                    size="medium"
                                                    iconName={Icons.OpenInBrowser}
                                                    onClick={() =>
                                                        window.open('https://beeline.ru')
                                                    }
                                                />
                                                <TooltipContainer
                                                    noArrow
                                                    place="top"
                                                    id={`method-${i}`}
                                                    offset={8}
                                                >
                                                    Влияние эндпоинта
                                                </TooltipContainer> */}
                                                </S.MethodNameContainer>
                                            </S.TableDataFullWidth>
                                            <TableData>
                                                {formatNullableString(operation.description)}
                                            </TableData>
                                            <TableData>
                                                {operation.techCapability ? (
                                                    <Link
                                                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${operation.techCapability.id}&type=TECH`}
                                                        title={operation.techCapability.name}
                                                    />
                                                ) : (
                                                    formatNullableString(null)
                                                )}
                                            </TableData>
                                            <TableData alignRight>
                                                {typeof operation.sla?.rps === 'number'
                                                    ? operation.sla?.rps
                                                    : formatNullableString(null)}
                                            </TableData>
                                            <TableData alignRight>
                                                {typeof operation.sla?.latency === 'number'
                                                    ? operation.sla?.latency
                                                    : formatNullableString(null)}
                                            </TableData>
                                            <TableData alignRight>
                                                {typeof operation.sla?.errorRate === 'number'
                                                    ? operation.sla?.errorRate
                                                    : formatNullableString(null)}
                                            </TableData>
                                            <TableData>
                                                <Label
                                                    title={
                                                        operation.deletedDate ? 'Удален' : 'Активен'
                                                    }
                                                    type={
                                                        operation.deletedDate ? 'error' : 'success'
                                                    }
                                                />
                                            </TableData>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </S.TableStyled>
                        </S.ServiceContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
            <TooltipContainer
                id={`notification-${structurizrInterface.id}`}
                offset={8}
                place="top"
                noArrow
                isOpen={isNotificationIconHovered}
            >
                {isSubscribed ? 'Отписаться от интерфейса' : 'Подписаться на интерфейс'}
            </TooltipContainer>
            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleUnsubscribe}
                title="Отписаться от интерфейса?"
            >
                Вы отписываетесь от <S.BoldSpan>{structurizrInterface.name}</S.BoldSpan>
            </Dialog>
        </>
    );
};
