import React, { FC } from 'react';
import { Icon, Icons } from '@beeline/lk-ui';

import { ILink } from './types';
import * as S from './units';

export const Link: FC<ILink> = ({ type = 'default', ...props }) => {
    return (
        <S.OuterLink rel="noopener noreferrer" href={props.path} target="_blank" {...props}>
            {type === 'file' && <Icon iconName={Icons.Attachment} size="small" />}

            {props.children}
        </S.OuterLink>
    );
};
