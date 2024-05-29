import React, { FC, useState } from 'react';
import { Button, Icon, IconButton, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SideBlock } from 'components/containers';
import { PivotArrow } from 'components/other';

import { ringIdToStatusMap } from './const';
import { ITechnologySideblock } from './types';
import * as S from './units';

export const TechnologySideblock: FC<ITechnologySideblock> = ({
    selectedTech,
    isOpen,
    onClose,
}) => {
    const [showApps, setShowApps] = useState(false);

    const handleArrowClick = () => {
        setShowApps(!showApps);
    };

    return (
        <SideBlock
            closeOnOutsideClick
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
                    <Button startIcon={<Icon iconName={Icons.Notification} />} variant="plain">
                        Подписаться
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
                <S.ButtonsContainer>
                    <S.Subtitle>Связанные артефакты (7)</S.Subtitle>
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
                </S.AppsContainer>
            </S.Container>
        </SideBlock>
    );
};
