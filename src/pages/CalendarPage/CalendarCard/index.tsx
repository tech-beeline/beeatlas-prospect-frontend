import React, { FC } from 'react';
import { Button, Icon, Icons } from '@beeline/lk-ui';

import { BorderContainer } from 'components/containers';
import { Link } from 'components/interaction';

import { ICalendarCard } from './types';
import * as S from './units';

export const CalendarCard: FC<ICalendarCard> = (props) => {
    return (
        <BorderContainer style={{ minWidth: '620px' }}>
            <div>
                <S.Date>{props.date}</S.Date>

                <S.Title>{props.title}</S.Title>

                <S.SubTitle>{props.subTitle}</S.SubTitle>

                <S.LinkContainer>
                    {/* TODO: название файла из апи + ссылка + скачивание */}
                    <Link type="file" path="">
                        Презентация.pttx
                    </Link>

                    <Link path="">Оппонирующая позиция.pttx</Link>

                    <Link path="">Запись заседания</Link>
                </S.LinkContainer>
            </div>

            <S.ButtonContainer>
                <Button variant="contained" endIcon={<Icon iconName={Icons.Download} />}>
                    Скачать протокол
                </Button>

                <S.BadgeNameStyled>Крестовоздвиженский К</S.BadgeNameStyled>
            </S.ButtonContainer>
        </BorderContainer>
    );
};
