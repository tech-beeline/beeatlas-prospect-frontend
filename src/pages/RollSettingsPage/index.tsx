import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { TitleBack } from 'components/interaction';

import * as ROUTER from 'router/const';

import * as S from './units';

export const RollSettingsPage = () => {
    const navigate = useNavigate();

    return (
        <S.PageWrapper className="PageWrapper">
            <S.TitleFlex>
                <TitleBack title="Настройки ролей" />

                <Button
                    variant="contained"
                    size="medium"
                    endIcon={<Icon iconName={Icons.Add} />}
                    onClick={() =>
                        navigate(
                            `${ROUTER.PERSONAL_AREA_PATH}${ROUTER.ROLL_SETTINGS_PATH}${ROUTER.ADD_PATH}`,
                        )
                    }
                    style={{ marginTop: '30px' }}
                >
                    Создать роль
                </Button>
            </S.TitleFlex>
        </S.PageWrapper>
    );
};
