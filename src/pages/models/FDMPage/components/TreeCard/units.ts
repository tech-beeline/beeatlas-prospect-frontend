import styled from '@emotion/styled';

import { Expand } from 'components/other';

export const Wrapper = styled.div<{ isFullWidthCard: boolean }>`
    flex: ${({ isFullWidthCard }) => (isFullWidthCard ? '0 1 100%' : '0 1 48%')};
    break-inside: avoid;

    min-width: 300px;
    min-height: 160px;
    height: min-content;
    /* max-width: 450px; */
    padding: 24px;
    margin-bottom: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const TitleContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-bottom: 24px;
`;

export const Title = styled.div`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);

    color: var(--color-text-link);

    cursor: pointer;
`;
export const ChildrenLinkTitle = styled(Title)`
    font-weight: var(--font-weight-regular);
`;

export const Text = styled(Title)`
    font-weight: var(--font-weight-regular);
    white-space: pre-wrap;

    color: var(--color-text-active);

    cursor: inherit;
`;

export const TextInactive = styled(Title)`
    font-weight: var(--font-weight-regular);
    white-space: pre-wrap;

    color: var(--color-text-inactive);

    cursor: inherit;
`;

export const MarginContainer = styled.div`
    margin-top: 24px;
`;

export const MetricsContainer = styled.div`
    display: flex;
    gap: 40px;

    margin-top: 12px;
`;

export const TitleSecond = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);

    color: var(--color-text-inactive);
`;

export const DomenText = styled(Title)`
    font-weight: var(--font-weight-regular);
`;

export const FlexBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ExpandStyled = styled(Expand)`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding-top: 24px;
`;

export const ChildrenExpandTitle = styled(FlexBlock)`
    margin-top: 24px;

    /* align-self: flex-end; */
    align-items: center;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    cursor: pointer;
`;

export const InnerFlex = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%; */
`;

export const ChipsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
    flex-wrap: wrap;

    margin-top: 8px;
`;

export const SubscribeButtonContainer = styled.div`
    display: flex;
    justify-content: end;

    margin-top: 12px;
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;
