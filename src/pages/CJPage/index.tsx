import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { BIForm } from './components/BIForm';
import { CJForm } from './components/CJForm';
import { Table } from './components/Table';
import * as S from './units';

export const CJPage = () => {
    const [isOpenSettingsCJ, setOpenSettingsCJ] = useState(false);
    const [isOpenBIForm, setOpenBIForm] = useState(false);

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
                    <Button onClick={() => setOpenBIForm(!isOpenBIForm)}>
                        Сохранить как черновик
                    </Button>

                    <Button variant="contained">Опубликовать</Button>
                </S.FlexSideContainer>
            </S.Header>

            <Table />

            <CJForm
                isOpen={isOpenSettingsCJ}
                onClose={() => setOpenSettingsCJ(false)}
                updateCJ={(values) => {
                    setName(values.name), setSubName(values.userPortrait);
                }}
                values={{ name, userPortrait: subName }}
            />
            <BIForm isOpen={isOpenBIForm} setOpen={setOpenBIForm} />
        </S.PageWrapper>
    );
};
