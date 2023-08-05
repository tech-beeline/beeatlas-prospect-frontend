import styled from '@emotion/styled';

import { theme } from 'styles';

// TODO: сделать у боди бэкграунд темы
export const PageWrapper = styled.div`
    /* height: 100vh; */
    padding: 72px 52px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 50%;
`;

export const Title = styled.h1`
    font-weight: var(--font-weight-medium);
    font-size: 100px;
    line-height: 110px;

    color: var(--color-text-active);
    background-color: var(--button-background-color);
`;

export const H1 = styled.h1`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h1);
    line-height: 66px;

    margin-top: 120px;

    background-color: var(--button-background-color);
`;

export const H2 = styled.h2`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h2);
    line-height: 56px;
`;

export const H3 = styled.h3`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: 44px;

    width: 798px;
    margin: 40px 0 12px;
`;

export const H4 = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: 32px;
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const GrayText = styled.p`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: 24px;

    color: ${theme.colors.textInactive};
`;

export const BoldTitle = styled.h5`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: 28px;

    margin-bottom: 8px;
`;

export const BoldText = styled.p`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-body2);
    line-height: 22px;
    letter-spacing: var(--font-letter-spacing-body3);
`;
