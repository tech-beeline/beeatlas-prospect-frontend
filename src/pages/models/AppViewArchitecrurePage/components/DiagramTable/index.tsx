import React from 'react';

import { TableBody } from 'components/ui';

import { DiagramTableRow } from './components';
import * as S from './units';

export const DiagramTable = () => {
    return (
        <div>
            <S.TableStyled>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <DiagramTableRow key={i} />
                    ))}
                </TableBody>
            </S.TableStyled>
        </div>
    );
};
