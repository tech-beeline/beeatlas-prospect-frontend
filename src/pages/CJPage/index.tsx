import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { NotFoundBlock } from 'components/other';

import { IBIData } from 'api/bi/types';
import { useGetCompleteCJDataByIdQuery, usePartialUpdateCJMutation } from 'api/queries/cj';
import { useModal } from 'hooks';
import * as ROUTER from 'router/const';
import { Dialog } from 'widgets/Dialog';

import { CJUpdateForm } from './components/CJUpdateForm';
import { Table } from './components/Table';
import * as S from './units';

export const CJPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { modalOpened, openModal, closeModal } = useModal();

    const { data, isLoading } = useGetCompleteCJDataByIdQuery(paramId);

    const hasDraftBIs =
        data?.steps
            .reduce((acc, step) => [...acc, ...step.bi], [] as IBIData[])
            .some((bi) => bi.draft) ?? false;

    const { mutateAsync: updateCJ, isLoading: updatingCj } = usePartialUpdateCJMutation();

    const [isOpenSettingsCJ, setOpenSettingsCJ] = useState(false);

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}`);
    };

    const handlePublish = () => {
        if (data) {
            if (hasDraftBIs) {
                openModal();
            } else {
                updateCJ({
                    id: String(data.id),
                    data: { draft: false },
                });
            }
        }
    };

    const handleMarkAsDraft = () => {
        if (data) {
            updateCJ({
                id: String(data.id),
                data: { draft: true },
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

            {!data && !isLoading && (
                <S.NotFoundContainer>
                    <NotFoundBlock />
                </S.NotFoundContainer>
            )}

            {data && (
                <CJUpdateForm
                    isOpen={isOpenSettingsCJ}
                    cjId={data.id}
                    onClose={() => setOpenSettingsCJ(false)}
                    values={{ name: data.name, userPortrait: data.user_portrait }}
                />
            )}
            <Dialog
                opened={modalOpened}
                confirmText="Закрыть"
                onConfirm={closeModal}
                onClose={closeModal}
                showDeclineButton={false}
            >
                CJ не может быть опубликован, так как в нем содержатся неопубликованные BI. Сначала
                опубликуйте BI, а потом вы сможете опубликовать свой CJ.
            </Dialog>
        </S.PageWrapper>
    );
};
