import styled from '@emotion/styled';

import { Card } from 'components/ui';

export const StepLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 0;
`;

export const StepScroll = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
`;

export const WideContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
    width: var(--assessment-content-width);
    margin: 0 auto;
    padding: 32px 0;
`;

export const ContentHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 16px;

    max-height: 40px;
`;

export const ReviewSummary = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    margin-top: 16px;
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Metrics = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const ReviewCard = styled(Card)`
    &.dsb_card {
        display: flex;
        flex-direction: column;
        padding: 0px 24px 24px;
    }
`;

export const CandidateNotice = styled.div<{ $tone: 'neutral' | 'success' | 'info' }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    margin: 0 -24px;
    padding: 16px 24px;

    border-radius: 12px 12px 0 0;
    background-color: ${({ $tone }) => `var(--color-status-${$tone}-background)`};
`;

export const CandidateNoticeTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const ReviewHeader = styled.div<{ $compactBottom?: boolean }>`
    position: sticky;
    top: 0;
    z-index: 1;

    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 24px 0 ${({ $compactBottom }) => ($compactBottom ? 0 : '24px')};

    background-color: var(--color-background-base);
`;

export const ReviewHeaderTitle = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
`;

export const TitleWithBadge = styled.div`
    display: flex;
    gap: 8px;
`;

export const SystemFilters = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SystemChips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Systems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Tag = styled.div`
    padding: 0px 8px;

    border-radius: 6px;

    background-color: var(--color-control-background);
`;

export const MatchGroups = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const MatchGroup = styled.div`
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: 12px;
`;

export const MatchGroupHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 24px;
    background: var(--color-background-base);
`;

export const MathGroupHeaderTitle = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

export const CatalogOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;

    background-color: var(--color-background-base-selected);
`;

export const CatalogOption = styled.label<{ $selected: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 24px;

    border: 1px solid
        ${({ $selected }) =>
            $selected ? 'var(--color-background-brand-hover)' : 'var(--color-border)'};
    border-radius: 12px;

    background-color: var(--color-background-base);

    cursor: pointer;
`;

export const CatalogOptionTitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const CatalogOptionTitle = styled.div`
    display: flex;
    gap: 12px;
`;

export const SideblockLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`;

export const SideblockContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
`;

export const SideblockHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
`;

export const SideblockFooter = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px 24px;
    border-top: 1px solid var(--color-divider);
`;
