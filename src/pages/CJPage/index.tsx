import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { observer } from 'mobx-react';

import { SideBlock } from './components/SideBlock';
import { Table } from './components/Table';
import * as S from './units';

const SettingsCJContent = ({ setOpen, name, subName, setName, setSubName }: any) => {
    const [nameValue, setNameValue] = useState(name);
    const [subNameValue, setSubNameValue] = useState(subName);

    const onSaveHandler = () => {
        setName(nameValue);
        setSubName(subNameValue);

        setOpen(false);
    };

    return (
        <>
            <S.FlexWrapper>
                <S.SideBlockTitle>Настройка CJ</S.SideBlockTitle>

                <Icon
                    iconName={Icons.Close}
                    onClick={() => setOpen(false)}
                    style={{ cursor: 'pointer' }}
                />
            </S.FlexWrapper>

            <S.TextFieldContainer>
                <TextField
                    value={nameValue}
                    onChange={({ target: { value } }) => setNameValue(value)}
                    label="Название"
                    fullWidth
                />

                <TextField
                    value={subNameValue}
                    onChange={({ target: { value } }) => setSubNameValue(value)}
                    label="Портрет пользователя"
                    fullWidth
                />
            </S.TextFieldContainer>

            <S.ButtonContainer>
                <Button onClick={() => setOpen(false)}>Отменить</Button>

                <Button variant="contained" onClick={onSaveHandler}>
                    Сохранить
                </Button>
            </S.ButtonContainer>
        </>
    );
};

export const CJPage = observer(() => {
    const [isOpenSettingsCJ, setOpenSettingsCJ] = useState(false);
    const [name, setName] = useState('Название CJ');
    const [subName, setSubName] = useState('Портрет пользователя');

    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={() => navigate(-1)}
                        style={{ cursor: 'pointer' }}
                    />

                    <div>
                        <S.Name>{name}</S.Name>
                        <S.Desription>{subName}</S.Desription>
                    </div>

                    <S.ButtonStyled
                        endIcon={<Icon iconName={Icons.Edit} />}
                        onClick={() => setOpenSettingsCJ(!isOpenSettingsCJ)}
                        id="buttonToggleId"
                    />
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button>Сохранить как черновик</Button>

                    <Button variant="contained">Опубликовать</Button>
                </S.FlexSideContainer>
            </S.Header>

            <Table />

            <SideBlock
                isOpen={isOpenSettingsCJ}
                setOpen={setOpenSettingsCJ}
                toggleId="buttonToggleId"
            >
                <SettingsCJContent
                    setOpen={setOpenSettingsCJ}
                    {...{ name, subName, setName, setSubName }}
                />
            </SideBlock>
        </S.PageWrapper>
    );
});
