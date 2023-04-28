import React, { useState } from 'react';
import { Button, Divider, TextField } from '@beeline/design-system-react';

import { TitleBack } from 'components/interaction';

import * as S from './units';

export const AddRollPage = () => {
    const [name, setName] = useState('');

    return (
        <S.PageWrapper className="PageWrapper">
            <TitleBack title="Создание новой роли" />

            <TextField
                label="Название"
                onChange={(event) => setName(event.target.value)}
                value={name}
            />

            <S.BottomBlock isShown={!!name}>
                <Divider />

                <S.ButtonContainer>
                    <Button size="medium" onClick={() => setName('')}>
                        Отменить
                    </Button>

                    <Button size="medium" variant="contained">
                        Сохранить
                    </Button>
                </S.ButtonContainer>
            </S.BottomBlock>
        </S.PageWrapper>
    );
};
