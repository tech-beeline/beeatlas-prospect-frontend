import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useGetCompleteCJDataByIdQuery, useUpdateCJMutation } from 'api/queries/cj';
import * as ROUTER from 'router/const';

import { CJUpdateForm } from './components/CJUpdateForm';
import { Table } from './components/Table';
import * as S from './units';

export const CJPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data } = useGetCompleteCJDataByIdQuery(paramId);
    const { mutateAsync: updateCJ, isLoading: updatingCj } = useUpdateCJMutation();

    const [isOpenSettingsCJ, setOpenSettingsCJ] = useState(false);

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}`);
    };

    const handlePublish = () => {
        if (data) {
            updateCJ({
                id: String(data.id),
                data: { draft: false, name: data.name, user_portrait: data.user_portrait },
            });
        }
    };

    const handleMarkAsDraft = () => {
        if (data) {
            updateCJ({
                id: String(data.id),
                data: { draft: true, name: data.name, user_portrait: data.user_portrait },
            });
        }
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        style={{ cursor: 'pointer' }}
                    />

                    {data && (
                        <div>
                            <S.Name>{data.name}</S.Name>
                            <S.Desription>{data.user_portrait}</S.Desription>
                        </div>
                    )}

                    <S.ButtonStyled
                        endIcon={<Icon iconName={Icons.Edit} />}
                        onClick={() => setOpenSettingsCJ(!isOpenSettingsCJ)}
                        id="buttonToggleId"
                    />
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button onClick={() => navigate(-1)}>Закрыть</Button>

                    {data && (
                        <Button
                            variant="contained"
                            onClick={data.draft ? handlePublish : handleMarkAsDraft}
                            disabled={updatingCj}
                        >
                            {data.draft ? 'Опубликовать' : 'Перевести в черновик'}
                        </Button>
                    )}
                </S.FlexSideContainer>
            </S.Header>

            {data && <Table cjId={data.id} tableData={data.steps} />}

            {data && (
                <CJUpdateForm
                    isOpen={isOpenSettingsCJ}
                    cjId={data.id}
                    onClose={() => setOpenSettingsCJ(false)}
                    values={{ name: data.name, userPortrait: data.user_portrait }}
                />
            )}
        </S.PageWrapper>
    );
};
