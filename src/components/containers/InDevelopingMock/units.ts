import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    height: 496px;

    background-color: ${theme.colors.backgroundLow};
`;

export const Image = styled.img`
    min-width: 400px;
    min-height: 400px;
    max-width: 400px;
    max-height: 400px;
`;

export const Text = styled.p`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    color: ${theme.colors.textActive};
`;
