import React, { FC } from 'react';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { INodePanel } from './types';
import * as S from './units';
import { ROWS } from './utils';

export const NodePanel: FC<INodePanel> = ({ node, onClose, width }) => {
    if (!node) {
        return (
            <S.Panel width={width}>
                <S.Body empty>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        setMinSize={false}
                        smallImage
                        text="Чтобы просмотреть свойства, выберите узел на графе"
                    />
                </S.Body>
            </S.Panel>
        );
    }

    return (
        <S.Panel width={width}>
            <S.HeaderBlock>
                <S.HeaderTop>
                    <Text variant="h6">{node.name}</Text>
                    <IconButton onClick={onClose} iconName={Icons.Close} size="large" />
                </S.HeaderTop>
                <S.TypeRow>
                    <S.TypeDot style={{ '--node-type-color': node.color } as React.CSSProperties} />
                    <Text variant="body2">{node.label}</Text>
                </S.TypeRow>
            </S.HeaderBlock>

            <S.Body>
                {ROWS.map(({ label, getValue }) => (
                    <S.Row key={label}>
                        <Text inactive variant="body2">
                            {label}
                        </Text>
                        <Text variant="body2">{getValue(node)}</Text>
                    </S.Row>
                ))}
                {node.tags ? (
                    <S.Row>
                        <Text inactive variant="body2">
                            Tags
                        </Text>
                        <Text variant="body2">{formatNullableString(node.tags)}</Text>
                    </S.Row>
                ) : null}
            </S.Body>
        </S.Panel>
    );
};
