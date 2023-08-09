import React from 'react';

import { Link } from 'components/interaction';
import { IconCard } from 'components/other';

import * as ROUTER from 'router/const';

import * as S from './units';
import * as STYLES from 'styles/units';

export const TemplatesPage = () => {
    return (
        <S.PageWrapper className="PageWrapper">
            <S.H3 className="H3">Шаблоны материалов</S.H3>

            <STYLES.H4 className="H4" style={{ marginBottom: '32px' }}>
                Выходите на защиту впервые
            </STYLES.H4>

            <IconCard
                icon="Chat"
                color="teal"
                title="Концепция продукта"
                text="Презентация идеи создания или развития ИТ-продукта или решения сложной проблемы (сложного коммунального элемента)"
                onClick={() =>
                    window.open(
                        'https://confluence.veon.com/pages/viewpage.action?pageId=132433700',
                        '_blank',
                    )
                }
            />

            <STYLES.H4 className="H4" style={{ marginTop: '54px' }}>
                Не нашли подходящий шаблон?
            </STYLES.H4>

            <S.SmallText className="SmallText">
                Обратитесь за&nbsp;
                <Link
                    path={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}${ROUTER.CONSULTATION_PATH}`}
                    fontSize={19}
                    isInner
                >
                    консультацией
                </Link>
            </S.SmallText>
        </S.PageWrapper>
    );
};
