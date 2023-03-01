import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { TitleBack } from 'components/interaction';

import { useRootStore } from 'stores/initStore';

import * as S from './units';

export const FDMResultPage = observer(() => {
    // const [searchParams] = useSearchParams();
    // const guid = searchParams.get('guid');

    const {
        generalStore: { resultTitle },
    } = useRootStore();

    // const [title] = useQueryParam('title', StringParam);

    const { guid } = useParams();

    return (
        <S.PageWrapper className="PageWrapper">
            <S.Container className="Container">
                {/* TODO: исправить */}
                <TitleBack title={resultTitle} />

                <S.Iframe
                    className="string"
                    id="iFrameTest"
                    title="test"
                    height="500"
                    frameBorder="0"
                    // style={{ height: '500px' }}
                    src={`https://ms-seaapp001.bee.vimpelcom.ru/?guid=${guid}`}
                    // src="http://127.0.0.1:8080/index.htm?guid=443A0FEE-EE47-4014-B9FD-9AFB06634E74"
                    // ref={iframeRef}
                />
            </S.Container>
        </S.PageWrapper>
    );
});
