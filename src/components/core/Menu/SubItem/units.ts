import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;
    padding: 0 32px 0 72px;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.textInactive};

    cursor: pointer;
    user-select: none;
`;
