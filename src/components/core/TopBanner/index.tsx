import React, { FC, useEffect } from 'react';

import { Link } from 'components/other';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { useTopBannerStore } from './store';
import * as S from './units';

export const TopBanner: FC = () => {
    const isClosed = useTopBannerStore((state) => state.isClosed);
    const close = useTopBannerStore((state) => state.close);
    const isEnabled = window.FEATURE_FLAGS.FLAG_SHOW_TOP_BANNER;
    const isVisible = isEnabled && !isClosed;

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--top-banner-height',
            isVisible ? `${S.BANNER_HEIGHT}px` : '0px',
        );

        return () => {
            document.documentElement.style.setProperty('--top-banner-height', '0px');
        };
    }, [isVisible]);

    if (!isEnabled || isClosed) {
        return null;
    }

    return (
        <S.Container>
            <S.TextContent>
                Уважаемые пользователи! Приглашаем вас пройти небольшой опрос по{' '}
                <Link outer url={S.SURVEY_URL} title="ссылке" />. Нам очень важно знать ваше мнение
                — именно оно помогает нам становиться лучше. Будем искренне благодарны за пару минут
                вашего времени!
            </S.TextContent>

            <IconButton iconName={Icons.Close} size="large" onClick={close} />
        </S.Container>
    );
};
