import React from 'react';

import * as S from './units';

export const AppInfoPage = () => {
    return (
        <S.PageWrapper>
            <S.Table>
                <S.TableTitle>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Description</th>
                </S.TableTitle>

                <S.TableStrings>
                    <th>app-version</th>
                    <th>0.1.1</th>
                    <th>версия приложения (бэкенда)</th>
                </S.TableStrings>

                <S.TableStrings>
                    <th>db-version</th>
                    <th>x.y.z</th>
                    <th>версия БД</th>
                </S.TableStrings>

                <S.TableStrings>
                    <th>db-host</th>
                    <th>mn-fdmdb001-dev</th>
                    <th>хост подключенной БД</th>
                </S.TableStrings>
            </S.Table>
        </S.PageWrapper>
    );
};
