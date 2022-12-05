import styled from '@emotion/styled';

import { Expand } from 'components/other';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isFullWidthCard: boolean }>`
    flex: ${({ isFullWidthCard }) => (isFullWidthCard ? '0 1 100%' : '0 1 48%')};

    min-width: 300px;
    min-height: 160px;
    height: min-content;
    /* max-width: 450px; */
    padding: 24px;

    border: 1px solid ${theme.colors.divider};
    border-radius: ${theme.borderRadius};
`;

export const TitleContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-bottom: 24px;
`;

export const Title = styled.div`
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;

    color: ${theme.colors.textLink};

    cursor: pointer;
`;

export const Text = styled(Title)`
    font-weight: 400;
    white-space: pre-wrap;

    color: ${theme.colors.textActive};

    cursor: inherit;
`;

export const TitleSecond = styled.p`
    font-weight: 400;
    font-size: 15px;
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
    padding-top: 24px;
`;

export const ChildrenExpandTitle = styled(FlexBlock)`
    /* align-self: flex-end; */
    align-items: center;

    font-weight: 500;
    font-size: 15px;
    line-height: 20px;

    cursor: pointer;
`;

export const InnerFlex = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%; */
`;
