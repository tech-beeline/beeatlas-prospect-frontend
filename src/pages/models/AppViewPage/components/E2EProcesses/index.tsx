import React, { useState } from 'react';

import { Search } from 'components/ui';
import { Table, TableBody } from 'components/ui';

import { E2EProcessRow } from './components';
import * as S from './units';

export const E2EProcesses = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <S.Container>
            <S.SearchContainer>
                <Search
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onClear={() => setSearchText('')}
                    placeholder="Название интерфейса или метода"
                />
            </S.SearchContainer>
            <Table>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <E2EProcessRow key={i} />
                    ))}
                </TableBody>
            </Table>
        </S.Container>
    );
};
