import React, { FC, useEffect, useRef, useState } from 'react';

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
    selection,
    children,
}) => {
    const [expanded, setExpanded] = useState(false);
    const rowRef = useRef<HTMLTableRowElement>(null);
    const nestedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selection) setExpanded(true);
    }, [selection]);

    useEffect(() => {
        if (!selection || !expanded) return;
        const target =
            selection.methodIndex === undefined
                ? rowRef.current
                : nestedRef.current?.querySelector(
                      `[data-method-index="${selection.methodIndex}"]`,
                  );
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [selection, expanded]);

    return (
        <>
            <S.RowStyled
                ref={rowRef}
                expanded={expanded}
                selected={!!selection && selection.methodIndex === undefined}
            >
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
                    <S.NestedCell colSpan={2}>
                        <S.NestedContainer ref={nestedRef}>{children}</S.NestedContainer>
                    </S.NestedCell>
                </TableRow>
            )}
        </>
    );
};
