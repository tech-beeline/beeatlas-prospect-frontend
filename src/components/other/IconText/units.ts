import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isSecondary: boolean; number?: number; to?: string }>`
    display: flex;

    ${({ isSecondary, number }) =>
        number
            ? css`
                  align-items: center;
                  gap: 12px;

                  font-weight: 700;
                  font-size: var(--font-size-h5);
                  line-height: 28px;
                  letter-spacing: 0.2px;
              `
            : !isSecondary
            ? css`
                  align-items: center;
                  gap: 12px;

                  font-weight: 700;
                  font-size: var(--font-size-body2);
                  line-height: 22px;
                  letter-spacing: 0.2px;
              `
            : css`
                  gap: 16px;

                  font-weight: 400;
                  font-size: var(--font-size-body1);
                  line-height: 24px;
                  letter-spacing: 0.2px;

                  color: ${theme.colors.textInactive};
              `}

    cursor: ${({ to }) => to && 'pointer'}
`;

export const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    width: 40px;
    height: 40px;

    font-weight: 500;
    font-size: var(--font-size-body3);
    line-height: 20px;
    letter-spacing: 0.2px;

    background-color: ${theme.colors.info};
    color: ${theme.colors.textInfo};

    border-radius: var(--size-border-radius-x6);
`;

export const Text = styled.p<{ to?: string }>`
    white-space: pre-line;

    color: ${({ to }) => !!to && theme.colors.textLink};
`;
