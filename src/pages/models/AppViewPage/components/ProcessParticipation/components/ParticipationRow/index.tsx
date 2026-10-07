import React, { FC, useEffect, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton, TableData, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IParticipationRowProps } from './types';
import * as S from './units';

export const ParticipationRow: FC<IParticipationRowProps> = ({
    title,
    code,
    url,
    methodsCount,
    expanded: defaultExpanded,
    children,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    useEffect(() => {
        setExpanded(defaultExpanded);
    }, [defaultExpanded]);

    return (
        <>
            <S.RowStyled expanded={expanded}>
                <TableData>
                    <S.NameContainer>
                        <IconButton
                            iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            size="medium"
                            onClick={() => setExpanded(!expanded)}
                        />
                        <S.NameText>
                            {url ? (
                                <Link title={title} url={url} />
                            ) : (
                                <Text variant="body3">{title}</Text>
                            )}
                            <Text inactive variant="body3">
                                {code}
                            </Text>
                        </S.NameText>
                    </S.NameContainer>
                </TableData>
                <TableData>{methodsCount}</TableData>
            </S.RowStyled>
            {expanded && (
                <TableRow>
                    <TableData colSpan={2}>
                        <S.NestedContainer>{children}</S.NestedContainer>
                    </TableData>
                </TableRow>
            )}
        </>
    );
};
