import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 48px;
    padding: 0 32px;

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.textInactive};

    cursor: pointer;
    user-select: none;
`;

export const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;
