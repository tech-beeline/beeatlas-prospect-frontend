import styled from '@emotion/styled';

import { Text } from 'components/core';
import { Card } from 'components/ui';

export const ViewWrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 220px;
    align-items: start;
    gap: 32px;

    box-sizing: border-box;
    width: var(--assessment-content-width, clamp(900px, calc(100% - 64px), 1230px));
    min-width: 900px;
    max-width: 100%;
    margin: 0 auto;
    padding: 32px 0;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    gap: 32px;
    min-width: 0;
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    scroll-margin-top: 24px;
`;

export const StatisticsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
`;

export const StatisticCard = styled(Card)`
    &.dsb_card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
    }
`;

export const StatisticValue = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
`;

export const ImpactValue = styled(Text)<{
    $tone: 'success' | 'neutral' | 'warning' | 'error';
}>`
    color: ${({ $tone }) => `var(--color-status-${$tone})`};
`;

export const MethodologyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
`;

export const MethodologyCard = styled(Card)<{
    $selected: boolean;
    $tone: 'success' | 'neutral' | 'warning' | 'error';
}>`
    &.dsb_card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 24px 16px;
        text-align: center;
        background: ${({ $selected, $tone }) =>
            $selected ? `var(--color-status-${$tone}-background)` : 'var(--color-background-base)'};
        border-color: ${({ $selected, $tone }) =>
            $selected ? `var(--color-status-${$tone})` : 'var(--color-border)'};
    }
`;

export const MethodologyCode = styled(Text)<{
    $selected: boolean;
    $tone: 'success' | 'neutral' | 'warning' | 'error';
}>`
    color: ${({ $selected, $tone }) =>
        $selected ? `var(--color-status-${$tone})` : 'var(--color-text-inactive)'};
`;

export const TechnicalChips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const CapabilityList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const CapabilityCard = styled(Card)`
    &.dsb_card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 24px;
    }
`;

export const CapabilityHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
`;

export const CapabilityTitle = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
`;

export const ProductTag = styled.span`
    width: fit-content;
    max-width: 100%;
    padding: 0 8px;
    overflow: hidden;

    border-radius: var(--size-border-radius-x2);
    background-color: var(--color-control-background);

    color: var(--color-text-active);
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const RequirementsRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 4px;
`;

export const ExpandButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: 0;
    background: transparent;
    color: var(--color-text-active);
    cursor: pointer;
`;

export const RelatedRequirements = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--color-divider);
`;

export const SystemsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const SystemCard = styled(Card)`
    &.dsb_card {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
    }
`;

export const SystemDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SideNavigation = styled.aside`
    position: sticky;
    top: 32px;
    align-self: start;
`;
