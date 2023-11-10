import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

// import { useUpdateCJMutation } from 'api/queries/cj';
// import { useGetCompleteCJDataByIdQuery, useUpdateCJMutation } from 'api/queries/cj';
import { CJ, useMockCJtore } from 'pages/CJLibraryPage/mocks';
import * as ROUTER from 'router/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CJForm } from './components/CJForm';
import { Table } from './components/Table';
import { Step } from './mocks';
import * as S from './units';

export const CJPage = () => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { getCjById, updateCj } = useMockCJtore();

    // const { data } = useGetCompleteCJDataByIdQuery(paramId);
    // const { mutateAsync: updateCJ, isLoading: updatingCj } = useUpdateCJMutation();

    const [isOpenSettingsCJ, setOpenSettingsCJ] = useState(false);

    const [cj, setCj] = useState<CJ | null>(null);
    const [tableData, setTableData] = useState<Step[]>([]);
    const [name, setName] = useState('Название CJ');
    const [subName, setSubName] = useState('Портрет пользователя');

    // useEffect(() => {
    //     if (data) {
    //         setName(data.name);
    //         setSubName(data.user_portrait);
    //         setTableData(
    //             data.steps.map((step) => ({
    //                 id: step.id,
    //                 order: step.order,
    //                 columnName: step.name,
    //                 bis: [],
    //             })),
    //         );
    //     }
    // }, [data]);

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

    const handleBackIconClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}`);
    };

    // const handleSave = (draft: boolean) => {
    //     if (cj) {
    //         updateCj(Number(paramId), { ...cj, draft, name, descr: subName, steps: tableData });
    //     } else {
    //         createCj({ draft, name, descr: subName, steps: tableData });
    //     }
    //     navigate(-1);
    // };

    const handleSave = () => {
        if (cj) {
            updateCj(Number(paramId), { ...cj, draft: !cj.draft });
        }
        navigate(-1);
    };

    // const handlePublish = () => {
    //     if (data) {
    //         updateCJ({
    //             id: String(data.id),
    //             data: { draft: false, name: data.name, user_portrait: data.user_portrait },
    //         });
    //     }
    // };

    // const handleMarkAsDraft = () => {
    //     if (data) {
    //         updateCJ({
    //             id: String(data.id),
    //             data: { draft: true, name: data.name, user_portrait: data.user_portrait },
    //         });
    //     }
    // };

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
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
                    <Button onClick={() => navigate(-1)}>Закрыть</Button>

                    {cj && (
                        <Button variant="contained" onClick={() => handleSave()}>
                            {cj.draft ? 'Опубликовать' : 'Перевести в черновик'}
                        </Button>
                    )}
                    {/* {data && (
                        <Button
                            variant="contained"
                            onClick={data.draft ? handlePublish : handleMarkAsDraft}
                            disabled={updatingCj}
                        >
                            {data.draft ? 'Опубликовать' : 'Перевести в черновик'}
                        </Button>
                    )} */}
                </S.FlexSideContainer>
            </S.Header>

            {cj && <Table cjId={cj.id} tableData={tableData} setTableData={setTableData} />}
            {/* {data && <Table cjId={data.id} tableData={tableData} setTableData={setTableData} />} */}

            <CJForm
                isOpen={isOpenSettingsCJ}
                onClose={() => setOpenSettingsCJ(false)}
                updateCJ={(values) => {
                    if (cj) {
                        updateCj(cj.id, { ...cj, name: values.name, descr: values.userPortrait });
                    }
                    setName(values.name), setSubName(values.userPortrait);
                    showSnackbar({ message: 'Изменения сохранены' });
                }}
                // updateCJ={async (values) => {
                //     if (data) {
                //         await updateCJ({
                //             id: String(data.id),
                //             data: {
                //                 draft: data.draft,
                //                 name: values.name,
                //                 user_portrait: values.userPortrait,
                //             },
                //         });
                //     }
                //     // setName(values.name), setSubName(values.userPortrait);
                //     showSnackbar({ message: 'Изменения сохранены' });
                // }}
                values={{ name, userPortrait: subName }}
            />
        </S.PageWrapper>
    );
};
