import React from 'react';
import { Label, TableData, TableRow } from '@beeline/design-system-react';

import { Link } from 'components/other';

import * as S from './units';

export const PatternsRow = () => {
    return (
        <>
            <TableRow>
                <TableData>
                    <Link
                        title="Сбор и сохранение потоковых данных"
                        url="https://docs.bw.vimpelcom.ru/techpolicy/"
                    />
                </TableData>
                <TableData>
                    <Label title="Паттерн" variant="contained" type="success" />
                </TableData>

                <S.TableDataStyled>
                    <S.ChipStyled
                        active={false}
                        label="React"
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onClick={() => {}}
                    />
                    <S.ChipStyled
                        active={false}
                        label="Structurizr OnPremise"
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onClick={() => {}}
                    />
                    <S.ChipStyled
                        active={false}
                        label="Structurizr Lite"
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onClick={() => {}}
                    />
                    <S.ChipStyled
                        active={false}
                        label="Sparx EA"
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onClick={() => {}}
                    />
                    <S.ChipStyled
                        active={false}
                        label="Vue"
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onClick={() => {}}
                    />
                    <Link title="+1" url="https://docs.bw.vimpelcom.ru/techpolicy/" />
                </S.TableDataStyled>
            </TableRow>
        </>
    );
};
