import React from 'react';
import { useParams } from 'react-router-dom';

import { TitleBack } from 'components/interaction';

import * as S from './units';

export const FDMResultPage = () => {
    const { guid } = useParams();

    return (
        <S.PageWrapper className="PageWrapper">
            <S.Container className="Container">
                <TitleBack title="" />

                <S.Iframe
                    className="string"
                    id="iFrameTest"
                    title="test"
                    height="500"
                    frameBorder="0"
                    src={`https://ms-seaapp001.bee.vimpelcom.ru:83/index.php?m=1&o=${guid}`}
                />
            </S.Container>
        </S.PageWrapper>
    );
};
