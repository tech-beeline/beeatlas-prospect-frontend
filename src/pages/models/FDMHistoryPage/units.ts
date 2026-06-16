import styled from '@emotion/styled';

import { Text } from 'components/core';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Wrapper = styled.div`
    width: 930px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    margin-top: 24px;
    margin-bottom: 24px;
`;

export const LegendContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    margin-bottom: 20px;
`;

export const LegendColor = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;

    background-color: var(--color-status-success-background);
`;

export const Content = styled.div`
    display: flex;
    gap: 24px;
`;

export const VersionContainer = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1;

    padding: 12px 0px;
`;

export const DividerContainer = styled.div`
    margin: 20px 0px;
`;

export const VerticalDivider = styled.div`
    width: 1px;

    background-color: var(--color-divider);
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const TextStyled = styled(Text)<{ highlighted?: boolean }>`
    ${({ highlighted }) =>
        highlighted ? ' background-color: var(--color-status-success-background);' : ''};
`;
