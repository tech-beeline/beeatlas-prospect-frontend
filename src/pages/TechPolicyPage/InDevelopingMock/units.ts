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
    min-width: 200px;
    min-height: 200px;
    max-width: 200px;
    max-height: 200px;
`;

export const Text = styled.p`
    font-weight: 500;
    font-size: var(--font-size-body1);
    line-height: 24px;

    color: ${theme.colors.textActive};
`;

export const Description = styled.p`
    margin-top: -8px;

    font-weight: 400;
    font-size: var(--font-size-body1);
    line-height: 24px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;
