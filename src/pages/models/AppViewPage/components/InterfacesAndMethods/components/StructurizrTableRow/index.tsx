import React, { FC, useState } from 'react';
import { IconButton, TableData } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ServiceTableRow } from './components';
import { IStructurizrTableRow } from './types';
import * as S from './units';

export const StructurizrTableRow: FC<IStructurizrTableRow> = ({ container }) => {
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
                        {container.name}
                    </S.NameContainer>
                </TableData>
            </S.TableRowStyled>
            {isExpanded &&
                container.interfaces.map((structurizrInterface, i) => (
                    <ServiceTableRow key={i} structurizrInterface={structurizrInterface} />
                ))}
        </>
    );
};
