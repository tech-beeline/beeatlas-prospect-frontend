import React, { FC, useState } from 'react';
import { IconButton, TableData } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ServiceTableRow } from './components';
import { IInterfaceTableRow } from './types';
import * as S from './units';

export const InterfaceTableRow: FC<IInterfaceTableRow> = ({ interfaceData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <S.TableRowStyled expanded={isExpanded}>
                <TableData>
                    <S.NameContainer>
                        <IconButton
                            size="medium"
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                        {interfaceData.name}
                    </S.NameContainer>
                </TableData>
            </S.TableRowStyled>
            {isExpanded &&
                interfaceData.services.map((service, i) => (
                    <ServiceTableRow key={i} service={service} />
                ))}
        </>
    );
};
