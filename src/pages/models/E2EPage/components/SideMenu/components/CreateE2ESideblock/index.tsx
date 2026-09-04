import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Button, IconButton, TextField } from 'components/ui';

import { usePostE2EMutation } from 'api/queries/staging-sequence';
import { E2EContentOptions, E2ETreeItemType } from 'pages/models/E2EPage/types';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { ICreateE2ESideblock } from './types';
import * as S from './units';

export const CreateE2ESideblock: FC<ICreateE2ESideblock> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const { mutateAsync: createE2E } = usePostE2EMutation();

    const handleCreate = async () => {
        const uid = crypto.randomUUID();
        await createE2E({
            e2e: {
                uid,
                name,
                description: '',
                biStepCode: '',
            },
            operationsRelations: [],
        });
        const params = new URLSearchParams(searchParams);
        params.set('tab', E2EContentOptions.E2E);
        params.set('id', String(uid));
        params.set('type', E2ETreeItemType.BI_STEP);
        setSearchParams(params);
        onClose();
    };

    return (
        <SideBlock large hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.Content>
                    <S.Title>
                        <Text variant="h5">Создание E2E</Text>
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
                    <Button fullWidth variant="primary" size="medium" onClick={handleCreate}>
                        Создать
                    </Button>
                </S.Footer>
            </S.Container>
        </SideBlock>
    );
};
