import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { CJ, useMockCJtore } from 'pages/CJLibraryPage/mocks';

import { CJForm } from './components/CJForm';
import { Table } from './components/Table';
import { Step } from './mocks';
import * as S from './units';

export const CJPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { getCjById, createCj, updateCj } = useMockCJtore();

    const [isOpenSettingsCJ, setOpenSettingsCJ] = useState(false);

    const [cj, setCj] = useState<CJ | null>(null);
    const [tableData, setTableData] = useState<Step[]>([]);
    const [name, setName] = useState('Название CJ');
    const [subName, setSubName] = useState('Портрет пользователя');

    console.log(tableData);

    useEffect(() => {
        if (paramId) {
            const cj = getCjById(Number(paramId));
            if (cj) {
                setName(cj.name);
                setSubName(cj.descr);
                setTableData(cj.steps);
                setCj(cj);
            }
        }
    }, [paramId, getCjById]);

    const navigate = useNavigate();

    const handleSave = (draft: boolean) => {
        if (cj) {
            updateCj(Number(paramId), { ...cj, draft, name, descr: subName, steps: tableData });
        } else {
            createCj({ draft, name, descr: subName, steps: tableData });
        }
        navigate(-1);
    };

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
                    <Button onClick={() => handleSave(true)}>Сохранить как черновик</Button>

                    <Button variant="contained" onClick={() => handleSave(false)}>
                        Опубликовать
                    </Button>
                </S.FlexSideContainer>
            </S.Header>

            <Table tableData={tableData} setTableData={setTableData} />

            <CJForm
                isOpen={isOpenSettingsCJ}
                onClose={() => setOpenSettingsCJ(false)}
                updateCJ={(values) => {
                    setName(values.name), setSubName(values.userPortrait);
                }}
                values={{ name, userPortrait: subName }}
            />
        </S.PageWrapper>
    );
};
