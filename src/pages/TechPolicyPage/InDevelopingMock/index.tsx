import React from 'react';
import { Button, Icon, Icons } from '@beeline/lk-ui';

import image from './images/empty-list.png';

import * as S from './units';

export const InDevelopingMock = () => {
    return (
        <S.Wrapper>
            <S.Image src={image} />

            <S.Text>Раздел в разработке</S.Text>

            <S.Description>
                Актуальную версию технической политики вы можете найти на конфлюенсе
            </S.Description>

            <Button
                variant="contained"
                endIcon={<Icon iconName={Icons.OpenInWindow} />}
                onClick={() =>
                    window.open(
                        'https://confluence.veon.com/pages/viewpage.action?pageId=162511052',
                        '_blank',
                    )
                }
            >
                Перейти
            </Button>
        </S.Wrapper>
    );
};
