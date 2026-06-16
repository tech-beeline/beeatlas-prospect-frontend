import React from 'react';

import { Link } from 'components/other';
import { IconCard } from 'components/other';

import * as R from 'router/const';
import * as STYLES from 'styles/units';

import * as S from './units';

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
                onClick={() => window.open(window.FEATURE_FLAGS.FLAG_TEMPLATE_URL, '_blank')}
            />

            <STYLES.H4 className="H4" style={{ marginTop: '54px' }}>
                Не нашли подходящий шаблон?
            </STYLES.H4>

            <S.SmallText className="SmallText">
                Обратитесь за&nbsp;
                <Link
                    outer={false}
                    title="консультацией"
                    url={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}${R.CONSULTATION_PATH}`}
                />
            </S.SmallText>
        </S.PageWrapper>
    );
};
