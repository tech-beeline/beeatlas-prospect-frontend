import React, { useState } from 'react';
import {
    ButtonGroup,
    Search,
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { InterfaceAdminTableRow, InterfaceTableRow } from './components';
import { ADMIN_INTERFACES, InterfaceOptions, INTERFACES } from './const';
import * as S from './units';

export const InterfacesAndMethods = () => {
    const [searchText, setSearchText] = useState('');
    const [interfaceOption, setInterfaceOption] = useState(InterfaceOptions.STRUCTURIZR);

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

            <ButtonGroup
                alwaysSelected
                selectedOption={{ id: interfaceOption }}
                size="small"
                options={[
                    {
                        id: InterfaceOptions.STRUCTURIZR,
                        label: 'Structurizr',
                    },
                    {
                        id: InterfaceOptions.MAPIC,
                        label: 'Mapic',
                    },
                ]}
                onChange={(option) => setInterfaceOption(option.id as InterfaceOptions)}
            />

            <Table>
                {INTERFACES.map((interfaceData, i) => (
                    <InterfaceTableRow key={i} interfaceData={interfaceData} />
                ))}
            </Table>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderData>Интерфейс mapic</TableHeaderData>
                        <TableHeaderData>Контекст api</TableHeaderData>
                        <TableHeaderData>Контекст провайдера</TableHeaderData>
                        <TableHeaderData>Интерфейс AaAC</TableHeaderData>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ADMIN_INTERFACES.map((adminInterface, i) => (
                        <InterfaceAdminTableRow key={i} adminInterface={adminInterface} />
                    ))}
                </TableBody>
            </Table>
        </S.Container>
    );
};
