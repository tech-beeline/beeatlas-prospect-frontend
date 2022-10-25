import React, { useEffect, useState } from 'react';

import { getAppInfo } from 'api/app-info';

import * as S from './units';

export const AppInfoPage = () => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        (async () => {
            const res = await getAppInfo();

            setInfo(res?.data);

            console.log('info', Object.entries(res?.data));
        })();
    }, []);

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
        </S.PageWrapper>
    );
};
