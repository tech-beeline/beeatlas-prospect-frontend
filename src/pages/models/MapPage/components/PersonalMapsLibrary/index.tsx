import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';

import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as S from './units';

export const PersonalMapsLibrary: FC = () => {
    const [mapToDelete, setMapToDelete] = useState<string | null>(null);

    const navigate = useNavigate();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const handleNavigate = () => {
        navigate(`${R.MODELS_PATH}${R.MAP_PATH}${R.ADD_PATH}`);
    };

    return (
        <>
            <S.PersonalMapsContainer>
                {Array.from({ length: 12 }).map((_, i) => (
                    <S.MapCard key={i}>
                        <S.FlexContainer>
                            <Text link pointer variant="subtitle1" onClick={handleNavigate}>
                                Ключевые возможности B2C
                            </Text>
                            <DropdownMenu
                                id={String(i)}
                                items={[
                                    {
                                        title: 'Редактировать',
                                        icon: Icons.Edit,
                                        onClick: handleNavigate,
                                    },
                                    {
                                        title: 'Скопировать ссылку',
                                        icon: Icons.Link,
                                        onClick: async () => {
                                            await navigator.clipboard.writeText(
                                                'Ключевые возможности B2C',
                                            );
                                            showSnackbar({ message: 'Ссылка скопирована' });
                                        },
                                    },
                                    {
                                        title: 'Удалить',
                                        icon: Icons.Delete,
                                        onClick: () => {
                                            setMapToDelete('Ключевые возможности B2C');
                                        },
                                    },
                                ]}
                            />
                        </S.FlexContainer>
                        <Text variant="body2">Краткое описание</Text>
                    </S.MapCard>
                ))}
            </S.PersonalMapsContainer>
            <Dialog
                opened={!!mapToDelete}
                onClose={() => setMapToDelete(null)}
                onConfirm={() => setMapToDelete(null)}
                title="Удалить карту"
            >
                Удалить карту <S.BoldSpan>{mapToDelete}</S.BoldSpan> без возможности восстановления
            </Dialog>
        </>
    );
};
