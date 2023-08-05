import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;

    color: ${theme.colors.success};
    background-color: ${theme.colors.backgroundSuccess};

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    border-radius: var(--size-border-radius-x6);

    user-select: none;
    cursor: pointer;
`;
