import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div<{ isSecondary: boolean; number?: number; to?: string }>`
    display: flex;

    ${({ isSecondary, number }) =>
        number
            ? css`
                  align-items: center;
                  gap: 12px;

                  font-weight: var(--font-weight-bold);
                  font-size: var(--font-size-h5);
                  line-height: var(--font-line-height-h5);
                  letter-spacing: var(--font-letter-spacing-body3);
              `
            : !isSecondary
            ? css`
                  align-items: center;
                  gap: 12px;

                  font-weight: var(--font-weight-bold);
                  font-size: var(--font-size-body2);
                  line-height: var(--font-line-height-body2);
                  letter-spacing: var(--font-letter-spacing-body3);
              `
            : css`
                  gap: 16px;

                  font-weight: var(--font-weight-regular);
                  font-size: var(--font-size-body1);
                  line-height: var(--font-line-height-body1);
                  letter-spacing: var(--font-letter-spacing-body3);

                  color: var(--color-text-inactive);
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

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);

    background-color: ${'var(--color-status-info-background)'};
    color: var(--color-status-info);

    border-radius: var(--size-border-radius-x6);
`;

export const Text = styled.p<{ to?: string }>`
    white-space: pre-line;

    color: ${({ to }) => !!to && 'var(--color-text-link)'};
`;
