import styled from '@emotion/styled';

import { ProgressButton } from 'components/ui';
import { Banner, Tabs } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    padding: 30px 32px 0;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    border-left: 1px solid var(--color-divider);

    overflow: auto;
`;

export const Container = styled.div`
    position: relative;

    width: 100%;
`;

export const BannerStyled = styled(Banner)`
    margin-bottom: 16px;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    margin: 8px 0px;
`;

export const JustText = styled.p`
    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body2);

    white-space: pre-line;
`;

export const Subtitle = styled.p`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);

    color: var(--color-text-inactive);
`;

export const AliasText = styled(Subtitle)`
    margin: -4px 0 12px;
`;

export const TabsStyled = styled(Tabs)`
    margin-top: -4px;
    margin-bottom: 24px;
`;

export const DomainText = styled(Subtitle)`
    margin-top: 24px;
`;

export const ChipsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
    flex-wrap: wrap;

    margin-top: 8px;
`;

export const SearchContainer = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
`;

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    margin-top: 32px;
`;

export const NoFoundBlock = styled.div`
    width: 410px;
    height: 44px;
    margin-top: 30px;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);
    text-align: center;
`;

export const TreeContainer = styled.div<{ activeViewList: number }>`
    /* display: flex; */
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    flex-basis: 0;
    /* gap: 24px; */

    columns: ${({ activeViewList }) => (activeViewList === 0 ? 2 : 1)};
    column-gap: 24px;

    padding: 16px 0;

    /* & > *:nth-child(1n) {
        order: 1;
    }

    & > *:nth-child(2n) {
        order: 2;
    } */

    @media only screen and (max-width: 1130px) {
        columns: 1;
    }
`;

export const NoChildrenContainer = styled.div`
    margin-top: 100px;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;

    padding-bottom: 132px;
`;

export const ListSwitcherWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SubscribeButtonContainer = styled.div`
    display: flex;
    gap: 16px;

    height: 40px;
`;

export const ProgressButtonStyled = styled(ProgressButton)<{ showProgress: boolean }>`
    .dsb-button-progress__svg {
        display: ${({ showProgress }) => (showProgress ? 'block' : 'none')};
    }
`;

export const ProgressButtonContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const FlexBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 20px;

    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;

export const BannerContainer = styled.div`
    margin: 24px 0px;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const MetricsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin-top: 36px;
`;

export const MetricsFlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
