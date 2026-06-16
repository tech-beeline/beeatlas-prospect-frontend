import styled from '@emotion/styled';

import { IPaper } from './types';

export const Paper = styled.div<IPaper>`
    position: relative;

    display: inline-block;
    vertical-align: top;

    padding: 48px;

    background-color: var(--color-background-base);

    border-radius: ${({ isRounded }) => (isRounded ? 'var(--size-border-radius-x6)' : 0)};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);
`;
