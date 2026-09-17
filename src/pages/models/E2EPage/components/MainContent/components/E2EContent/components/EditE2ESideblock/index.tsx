import React, { FC, useEffect, useState } from 'react';
import { BIStepCodeFields } from 'features/e2e';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Button, IconButton, TextField } from 'components/ui';

import {
    useGetStagingSequenceBiStepByCodeQuery,
    usePatchE2EMutation,
} from 'api/queries/staging-sequence';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { IEditE2ESideblock } from './types';
import * as S from './units';

export const EditE2ESideblock: FC<IEditE2ESideblock> = ({ isOpen, onClose, data }) => {
    const [name, setName] = useState('');
    const [biStepCode, setBIStepCode] = useState('');
    useEffect(() => {
        if (data) {
            setName(data.e2e.name);
            setBIStepCode(data.e2e.biStepCode ?? '');
        }
    }, [data]);

    const { data: biStepData, isLoading: isBiStepLoading } = useGetStagingSequenceBiStepByCodeQuery(
        data?.e2e.biStepCode,
    );
    const { mutateAsync: patchE2E, isPending } = usePatchE2EMutation();

    const handleEdit = async () => {
        if (data) {
            await patchE2E({
                code: data.e2e.code,
                data: { name, biStepCode },
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
                    <BIStepCodeFields
                        key={data?.e2e.code}
                        biCode={biStepData?.bi.uid}
                        biId={biStepData?.bi.id}
                        disabled={isPending || isBiStepLoading}
                        value={biStepCode}
                        onChange={setBIStepCode}
                    />
                </S.Content>
                <S.Footer>
                    <Button fullWidth variant="outlined" size="medium" onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button
                        fullWidth
                        disabled={!name.trim() || !biStepCode || isPending || isBiStepLoading}
                        variant="primary"
                        size="medium"
                        onClick={handleEdit}
                    >
                        Сохранить
                    </Button>
                </S.Footer>
            </S.Container>
        </SideBlock>
    );
};
