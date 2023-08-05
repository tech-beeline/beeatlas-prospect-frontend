import styled from '@emotion/styled';

import { theme } from 'styles';

// Возможность логирования событий аутентификации

export const PageWrapper = styled.div`
    height: 100vh;
    padding: 124px 308px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Title = styled.h3`
    font-weight: 400;
    font-size: var(--font-size-h3);
    line-height: 44px;
    letter-spacing: 0.3px;
`;
