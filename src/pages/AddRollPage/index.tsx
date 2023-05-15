import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, TextField } from '@beeline/design-system-react';
import { observer } from 'mobx-react';

import { TitleBack } from 'components/interaction';

import * as ROUTER from 'router/const';
import { useRootStore } from 'stores/initStore';

import * as S from './units';

export const AddRollPage = observer(() => {
    const {
        generalStore: { createRole },
    } = useRootStore();

    const [name, setName] = useState('');

    const navigate = useNavigate();

    const createRoleHandler = (name: string) => {
        const res = createRole({ name });

        !!res && navigate(`${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}`);
    };

    return (
        <S.PageWrapper className="PageWrapper">
            <TitleBack title="Создание новой роли" />

            <TextField
                label="Название"
                onChange={(event) => setName(event.target.value)}
                value={name}
                autoFocus
            />

            <S.BottomBlock isShown={!!name}>
                <Divider />

                <S.ButtonContainer>
                    <Button size="medium" onClick={() => setName('')}>
                        Отменить
                    </Button>

                    <Button
                        size="medium"
                        variant="contained"
                        onClick={() => createRoleHandler(name)}
                    >
                        Сохранить
                    </Button>
                </S.ButtonContainer>
            </S.BottomBlock>
        </S.PageWrapper>
    );
});
