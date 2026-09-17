import React, { FC, useEffect, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Button, IconButton, TextField } from 'components/ui';

import { usePatchE2EMutation } from 'api/queries/staging-sequence';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { IEditE2ESideblock } from './types';
import * as S from './units';

export const EditE2ESideblock: FC<IEditE2ESideblock> = ({ isOpen, onClose, data }) => {
    const [name, setName] = useState('');
    useEffect(() => {
        if (data) {
            setName(data.e2e.name);
        }
    }, [data]);

    const { mutateAsync: patchE2E } = usePatchE2EMutation();

    const handleEdit = async () => {
        if (data) {
            await patchE2E({
                code: data.e2e.code,
                data: { name },
            });
            onClose();
        }
    };

    return (
        <SideBlock large hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.Content>
                    <S.Title>
                        <Text variant="h5">Редактирование шага E2E-сценария</Text>
                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.Title>
                    <TextField
                        fullWidth
                        label="Название"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </S.Content>
                <S.Footer>
                    <Button fullWidth variant="outlined" size="medium" onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button fullWidth variant="primary" size="medium" onClick={handleEdit}>
                        Сохранить
                    </Button>
                </S.Footer>
            </S.Container>
        </SideBlock>
    );
};
