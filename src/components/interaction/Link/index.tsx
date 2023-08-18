import React, { FC } from 'react';
import { Link as LinkRR } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({ type = 'default', ...props }) => {
    return props.isInner ? (
        <LinkRR className="LinkRR" to={props.path}>
            <S.LinkText
                className="LinkText"
                fontSize={props.fontSize}
                noLine={props.noLine}
                isInline={props.isInline}
            >
                {props.children}
            </S.LinkText>
        </LinkRR>
    ) : (
        <S.OuterLink
            className="OuterLink"
            rel="noopener noreferrer"
            href={props.path}
            target="_blank"
            fontSize={props.fontSize}
            noLine={props.noLine}
            isInline={props.isInline}
        >
            {type === 'file' && <Icon iconName={Icons.Attachment} size="small" />}

            {props.children}
        </S.OuterLink>
    );
};
