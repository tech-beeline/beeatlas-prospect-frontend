import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import React from 'react';

import image from './images/empty-list.png';

import * as S from './units';

export const InDevelopingMock = () => {
    return (
        <S.Wrapper className="Wrapper">
            <S.Image className="Image" src={image} />

            <S.Text className="Text">Раздел в разработке</S.Text>

            <S.Description className="Description">
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
