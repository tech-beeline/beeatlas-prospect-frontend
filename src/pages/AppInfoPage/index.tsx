import React, { useEffect, useRef, useState } from 'react';

import { getAppInfo } from 'api/app-info';

import * as S from './units';

export const AppInfoPage = () => {
    const [info, setInfo] = useState({});

    const iframeRef = useRef(null);

    useEffect(() => {
        (async () => {
            const res = await getAppInfo();

            setInfo(res?.data);

            // console.log('info', Object.entries(res?.data));
        })();
    }, []);

    useEffect(() => {
        console.log(
            'iframeRef',
            // @ts-ignore
            iframeRef.current?.contentWindow,
        );

        document.getElementById('contentIFrame');

        const iframeId = document.getElementById('iFrameTest');

        // @ts-ignore
        console.log(iframeId?.contentWindow);
        // setTimeout(() => {
        // @ts-ignore

        console.log('toc', iframeId?.contentWindow.document.getElementsByTagName('iframe'));

        // console.log(
        //     'w3',
        // @ts-ignore
        // iframeRef.current?.contentWindow.document.getElementsById('IndexHeader').style.display =
        // );

        // }, 100);
    }, [iframeRef.current]);

    return (
        <S.PageWrapper>
            <S.Table>
                <S.TableTitle>
                    <th>Key</th>
                    <th>Value</th>
                </S.TableTitle>

                {Object.keys(info).map((key) => {
                    return (
                        <S.TableStrings key={key}>
                            <th>{key}</th>
                            {/* @ts-ignore */}
                            <th>{info[key]}</th>
                        </S.TableStrings>
                    );
                })}
            </S.Table>

            <hr />

            {/* <div style={{ position: 'relative', width: '100%' }}> */}
            <iframe
                id="iFrameTest"
                title="test"
                height="500"
                // width="100%"
                // width="calc(100% + 267px)"
                style={{
                    padding: '10px',
                    width: 'calc(100% + 267px)',
                    position: 'absolute',
                    left: '-267px',
                }}
                frameBorder="0"
                // style={{ height: '500px' }}
                src="https://ms-seaapp001.bee.vimpelcom.ru/?guid=443A0FEE-EE47-4014-B9FD-9AFB06634E74"
                // src="http://127.0.0.1:8080/index.htm?guid=443A0FEE-EE47-4014-B9FD-9AFB06634E74"
                ref={iframeRef}
            />

            <div style={{ position: 'absolute', width: '100px', height: '100%', left: 0 }} />
            {/* </div> */}
        </S.PageWrapper>
    );
};
