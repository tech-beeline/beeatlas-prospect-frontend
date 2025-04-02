import React, { useState } from 'react';
import { Search, Table } from '@beeline/design-system-react';

import { InterfaceTableRow } from './components';
import { INTERFACES } from './const';
import * as S from './units';

export const InterfacesAndMethods = () => {
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
                {INTERFACES.map((interfaceData, i) => (
                    <InterfaceTableRow key={i} interfaceData={interfaceData} />
                ))}
            </Table>
        </S.Container>
    );
};
