import React, { FC } from 'react';

import { IMarkdownLinkRenderer } from './types';

export const MarkdownLinkRenderer: FC<IMarkdownLinkRenderer> = ({ children, href }) => {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
};

export const MarkdownCodeRenderer: FC<IMarkdownLinkRenderer> = ({ children }) => {
    return <div>{children}</div>;
};
