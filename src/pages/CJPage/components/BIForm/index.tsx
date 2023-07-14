import {
    Button,
    Checkbox,
    Icon,
    Radio,
    Select,
    TextArea,
    TextField,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { TOption } from 'pages/CalendarPage/types';
import React, { FC } from 'react';
import { SideBlock } from '../SideBlock';
import { SmileRate } from './SmileRate';
import { IBIForm } from './types';
import * as S from './units';

export const BIForm: FC<IBIForm> = (props) => {
    const makeOption = (option: TOption<string>) => {
        return <span>{option.value}</span>;
    };

    return (
        // @ts-ignore
        // TODO: зафиксировать хэдер и скролить контент
        <SideBlock isOpen={props.isOpen} setOpen={props.setOpen} style={{ overflow: 'auto' }}>
            <S.TitleWrapper>
                <Icon
                    iconName={Icons.ArrowLeft}
                    // onClick={() => setOpen(false)}
                    style={{ cursor: 'pointer' }}
                />

                <S.SideBlockTitle>Создание BI</S.SideBlockTitle>
            </S.TitleWrapper>

            <S.TextFieldContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <TextField
                        value={'Название BI'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Название"
                        fullWidth
                    />

                    <Checkbox label="Коммунальный" />
                </div>

                <TextArea value={'Text'} label="Описание" fullWidth />

                <S.SubTitle>Характеристики</S.SubTitle>

                <Radio label="Целевой" />
                <Radio label="Фактический" />

                <Select
                    label="Стадия ЖЦ"
                    options={[
                        {
                            id: 1,
                            value: 'Стадия ЖЦ',
                        },
                        {
                            id: 2,
                            value: 'Значение 2',
                        },
                        {
                            id: 3,
                            value: 'Значение 3',
                        },
                    ]}
                    size="small"
                    values={[]}
                    makeOption={makeOption}
                    onChange={(option) => console.log(option)}
                    fullWidth
                />

                <S.SubTitle>Участники взаимодействия</S.SubTitle>

                <S.BorderBlock>
                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Сторона"
                        fullWidth
                    />

                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Описание участников"
                        fullWidth
                    />
                </S.BorderBlock>

                <S.SubTitle>Ценностный результат</S.SubTitle>

                <S.BorderBlock>
                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Сторона"
                        fullWidth
                    />

                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Описание участников"
                        fullWidth
                    />
                </S.BorderBlock>

                <S.SubTitle>Чувства и эмоции</S.SubTitle>

                <SmileRate />

                <S.SubTitle>Входы и выходы</S.SubTitle>

                <S.BorderBlock>
                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Вход 1"
                        fullWidth
                    />

                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Вход 1"
                        helperText="Поле не обязательно"
                        fullWidth
                    />

                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Выход 1"
                        fullWidth
                    />

                    <TextField
                        value={'Text'}
                        // onChange={({ target: { value } }) => setNameValue(value)}
                        label="Выход 1"
                        helperText="Поле не обязательно"
                        fullWidth
                    />
                </S.BorderBlock>

                <S.SubTitle>Сценарии</S.SubTitle>

                <TextArea label="Клиентский сценарий" fullWidth />

                <TextField
                    // onChange={({ target: { value } }) => setNameValue(value)}
                    label="Ссылка на флоу"
                    fullWidth
                />

                <TextArea label="Описание реакции ЕКП" fullWidth />
            </S.TextFieldContainer>

            <S.ButtonContainer>
                <Button size="medium">Отменить</Button>

                <Button size="medium" variant="contained">
                    Сохранить
                </Button>
            </S.ButtonContainer>
        </SideBlock>
    );
};
