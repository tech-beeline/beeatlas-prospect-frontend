import styled from '@emotion/styled';

import { Subtitle1 } from 'styles/units';

export const CJCard = styled.div`
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const FlexContainer = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    margin-top: 16px;
`;

export const Title = styled(Subtitle1)`
    color: var(--color-text-link);

    cursor: pointer;
`;

export const Number = styled.div`
    margin-top: 4px;

    color: var(--color-text-disabled);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const Description = styled.div<{ clampLines: boolean }>`
    display: -webkit-box;
    ${({ clampLines }) => (clampLines ? '-webkit-line-clamp: 3;' : '')}
    -webkit-box-orient: vertical;

    overflow: hidden;

    margin-top: 12px;

    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const DateContainer = styled.div`
    margin-top: 24px;
`;

export const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;
