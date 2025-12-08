import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import * as ROUTER from 'router/const';

import * as S from './units';

export const BPMNViewPage = () => {
    const navigate = useNavigate();
    // const { id } = useParams();

    const FileData = true;
    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={() =>
                            navigate(`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}?id=4756`)
                        }
                    />
                    <div>
                        <S.Name>Название</S.Name>
                        <S.Desription>
                            Cj доступен только для просмотра. Чтобы внести изменения, скачайте и
                            загрузите обновленный файл
                        </S.Desription>
                    </div>
                    <IconButton iconName={Icons.Download} size="small" variant="outlined" />
                    <S.SelectWrapper
                        fullWidth
                        label=""
                        name=""
                        options={[]}
                        values={[]}
                        onChange={() => {}}
                        size="small"
                    />
                </S.FlexSideContainer>
                <IconButton iconName={Icons.Close} size="large" />
            </S.Header>
            {FileData && <S.Content></S.Content>}
        </S.PageWrapper>
    );
};
