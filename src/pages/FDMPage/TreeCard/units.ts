import styled from '@emotion/styled';

import { Expand } from 'components/other';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isFullWidthCard: boolean }>`
    flex: ${({ isFullWidthCard }) => (isFullWidthCard ? '0 1 100%' : '0 1 48%')};
    break-inside: avoid;

    min-width: 300px;
    min-height: 160px;
    height: min-content;
    /* max-width: 450px; */
    padding: 24px;
    margin-bottom: 24px;

    border: 1px solid ${theme.colors.divider};
    border-radius: var(--size-border-radius-x6);
`;

export const TitleContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-bottom: 24px;
`;

export const Title = styled.div`
    font-weight: 500;
    font-size: var(--font-size-body2);
    line-height: 22px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textLink};

    cursor: pointer;
`;
export const ChildrenLinkTitle = styled(Title)`
    font-weight: 400;
`;

export const Text = styled(Title)`
    font-weight: 400;
    white-space: pre-wrap;

    color: ${theme.colors.textActive};

    cursor: inherit;
`;

export const TitleSecond = styled.p`
    font-weight: 400;
    font-size: var(--font-size-body3);
    line-height: 18px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textInactive};
`;

export const DomenText = styled(Title)`
    font-weight: 400;
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

    font-weight: 500;
    font-size: var(--font-size-body3);
    line-height: 20px;

    cursor: pointer;
`;

export const InnerFlex = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%; */
`;
