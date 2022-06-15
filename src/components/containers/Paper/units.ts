import styled from '@emotion/styled';

import { theme } from 'styles';

import { IPaper } from './types';

export const Paper = styled.div<IPaper>`
    position: relative;

    display: inline-block;
    vertical-align: top;

    padding: 48px;

    background-color: ${theme.colors.white};

    border-radius: ${({ isRounded }) => (isRounded ? theme.borderRadius : 0)};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);
`;
