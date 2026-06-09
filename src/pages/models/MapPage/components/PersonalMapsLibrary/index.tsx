import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Skeleton } from 'components/ui';

import { IPersonalMapData } from 'api/maps/types';
import { useDeletePersonalMapMutation, useGetPersonalMapsQuery } from 'api/queries/maps';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as S from './units';

export const PersonalMapsLibrary: FC = () => {
    const [mapToDelete, setMapToDelete] = useState<IPersonalMapData | null>(null);

    const { data: mapsData, isLoading } = useGetPersonalMapsQuery();
    const { mutateAsync: deletePersonalMap } = useDeletePersonalMapMutation();

    const navigate = useNavigate();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleTitleClick = (id: number) => {
        navigate(`${R.MODELS_PATH}${R.MAP_PATH}${R.PERSONAL_PATH}/${id}`);
    };

    const handleEditClick = (id: number) => {
        navigate(`${R.MODELS_PATH}${R.MAP_PATH}${R.ADD_PATH}${`?id=${id}`}`);
    };

    const handleCopyClick = async (id: number) => {
        await navigator.clipboard.writeText(
            `${window.location.origin}${R.MODELS_PATH}${R.MAP_PATH}${R.PERSONAL_PATH}/${id}`,
        );
        showSnackbar({ message: 'Ссылка скопирована' });
    };

    const handleConfirmDelete = async () => {
        if (mapToDelete) {
            await deletePersonalMap(String(mapToDelete.id));
        }
        setMapToDelete(null);
        showSnackbar({ message: 'Карта удалена' });
    };

    return (
        <>
            {mapsData && mapsData.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Созданных карт нет"
                        text=""
                    />
                </S.NotFoundContainer>
            )}
            <S.PersonalMapsContainer>
                {isLoading &&
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} height={200} radius={12} />
                    ))}
                {mapsData &&
                    mapsData.map((map) => (
                        <S.MapCard key={map.id}>
                            <div>
                                <S.FlexContainer>
                                    <S.TitleContainer>
                                        <Text
                                            link
                                            pointer
                                            variant="subtitle1"
                                            onClick={() => handleTitleClick(map.id)}
                                        >
                                            {map.name}
                                        </Text>
                                        <Text inactive variant="body3">
                                            {map.type.title}
                                        </Text>
                                    </S.TitleContainer>
                                    <DropdownMenu
                                        id={String(map.id)}
                                        items={[
                                            [
                                                {
                                                    title: 'Редактировать',
                                                    icon: Icons.Edit,
                                                    onClick: () => handleEditClick(map.id),
                                                },
                                                {
                                                    title: 'Скопировать ссылку',
                                                    icon: Icons.Link,
                                                    onClick: () => handleCopyClick(map.id),
                                                },
                                                {
                                                    title: 'Удалить',
                                                    icon: Icons.Delete,
                                                    onClick: () => setMapToDelete(map),
                                                },
                                            ],
                                        ]}
                                    />
                                </S.FlexContainer>
                                <Text variant="body2">{map.description}</Text>
                            </div>
                            <S.DatesContainer>
                                <S.GrowContainer>
                                    <Text inactive variant="overline">
                                        ДАТА СОЗДАНИЯ
                                    </Text>
                                    <Text variant="body2">
                                        {dayjs(map.createdDate).format('DD.MM.YYYY')}
                                    </Text>
                                </S.GrowContainer>
                                <S.GrowContainer>
                                    <Text inactive variant="overline">
                                        ДАТА ИЗМЕНЕНИЯ
                                    </Text>
                                    <Text variant="body2">
                                        {dayjs(map.updatedDate ?? map.createdDate).format(
                                            'DD.MM.YYYY',
                                        )}
                                    </Text>
                                </S.GrowContainer>
                            </S.DatesContainer>
                        </S.MapCard>
                    ))}
            </S.PersonalMapsContainer>
            <Dialog
                opened={!!mapToDelete}
                onClose={() => setMapToDelete(null)}
                onConfirm={handleConfirmDelete}
                confirmText="Удалить"
                title="Удалить карту"
            >
                Удалить карту <S.BoldSpan>{mapToDelete?.name}</S.BoldSpan> без возможности
                восстановления
            </Dialog>
        </>
    );
};
