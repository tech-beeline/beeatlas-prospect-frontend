import React, { FC } from 'react';
import { Button, Icon, IconButton, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SideBlock } from 'components/containers';

import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscribedTechnologiesIdsQuery,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ringIdToStatusMap } from './const';
import { ITechnologySideblock } from './types';
import * as S from './units';

export const TechnologySideblock: FC<ITechnologySideblock> = ({
    selectedTech,
    isOpen,
    onClose,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { modalOpened, openModal, closeModal } = useModal();

    // const [showApps, setShowApps] = useState(false);

    const { data: subscribedTechnologiesIds } = useGetSubscribedTechnologiesIdsQuery();

    const { mutateAsync: createSubscription } = useCreateSubscriptionMutation();
    const { mutateAsync: deleteSubscrition } = useDeleteSubscriptionMutation();

    const isSubscribed = Boolean(
        selectedTech && subscribedTechnologiesIds?.includes(selectedTech.id),
    );

    // const handleArrowClick = () => {
    //     setShowApps(!showApps);
    // };

    const handleSubscribeButtonClick = async () => {
        if (isSubscribed) {
            openModal();
        } else if (selectedTech) {
            await createSubscription({
                entityType: SubscriptionEntityVariants.TECH,
                id: selectedTech.id,
            });
            showSnackbar({
                message:
                    'Вы подписались на изменения технологии. Уведомления будут отображаться на витрине ФДМ',
            });
        }
    };

    const handleUnsubscribe = async () => {
        if (selectedTech) {
            await deleteSubscrition({
                entityType: SubscriptionEntityVariants.TECH,
                id: selectedTech.id,
            });
            closeModal();
            showSnackbar({
                message: 'Вы отписаны от уведомлений',
            });
        }
    };

    return (
        <>
            <SideBlock
                closeOnOutsideClick={false}
                outsideClickExceptionIds={['menuItem']}
                aboveContent={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <S.Container>
                    <S.TitleContainer>
                        <S.Title>Информация о технологии</S.Title>
                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.TitleContainer>
                    <S.ButtonsContainer>
                        <Button
                            startIcon={<Icon iconName={Icons.OpenInBrowser} />}
                            variant="plain"
                            disabled={!selectedTech?.link}
                            onClick={() => window.open(selectedTech?.link ?? '', '_blank')}
                        >
                            Подробнее
                        </Button>
                        <Button
                            startIcon={
                                <Icon
                                    iconName={
                                        isSubscribed ? Icons.NotificationOff : Icons.Notification
                                    }
                                />
                            }
                            onClick={handleSubscribeButtonClick}
                            variant="plain"
                        >
                            {isSubscribed ? 'Отписаться' : 'Подписаться'}
                        </Button>
                    </S.ButtonsContainer>
                    <S.NameContainer>
                        <S.Subtitle>{selectedTech?.label}</S.Subtitle>
                        <Label
                            title={selectedTech?.ring.name}
                            variant="contained"
                            type={ringIdToStatusMap[selectedTech?.ring.id ?? 1]}
                        />
                    </S.NameContainer>
                    <S.DescriptionHeader>Описание</S.DescriptionHeader>
                    <S.Description>{selectedTech?.description}</S.Description>
                    <S.SubtitleMargin>Последние изменения</S.SubtitleMargin>
                    <S.LastChanges>Раздел ещё в разработке</S.LastChanges>
                    {/* <S.ButtonsContainer>
                        <S.Subtitle>Приложения (7)</S.Subtitle>
                        <PivotArrow
                            style={{ cursor: 'pointer' }}
                            position={showApps && 'top'}
                            onClick={handleArrowClick}
                        />
                    </S.ButtonsContainer>
                    <S.AppsContainer open={showApps}>
                        <S.Description>Beeworks (App)</S.Description>
                        <S.Description>Beeworks (App)</S.Description>
                        <S.Description>Beeworks (App)</S.Description>
                        <S.Description>Beeworks (App)</S.Description>
                        <S.Description>Beeworks (App)</S.Description>
                        <S.Description>Beeworks (App)</S.Description>
                        <S.Description>Beeworks (App)</S.Description>
                    </S.AppsContainer> */}
                </S.Container>
            </SideBlock>
            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleUnsubscribe}
                title="Отписаться от технологии?"
            >
                Вы отписываетесь от <S.BoldSpan>{selectedTech?.label}</S.BoldSpan>
            </Dialog>
        </>
    );
};
