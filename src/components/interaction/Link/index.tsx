import React, { FC } from 'react';
import { Link as LinkRR } from 'react-router-dom';
import { Icon, Icons } from '@beeline/lk-ui';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({ type = 'default', ...props }) => {
    return props.isInner ? (
        <LinkRR to={props.path}>
            <S.LinkText fontSize={props.fontSize} noLine={props.noLine}>
                {props.children}
            </S.LinkText>
        </LinkRR>
    ) : (
        <S.OuterLink rel="noopener noreferrer" href={props.path} target="_blank" {...props}>
            {type === 'file' && <Icon iconName={Icons.Attachment} size="small" />}

            {props.children}
        </S.OuterLink>
    );
};
