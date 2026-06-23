import styled from '@emotion/styled';

import { Card, ExpansionPanel } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const BreadcrumbContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: -16px;
`;

export const SpaceBetweenContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    flex: 1;
    min-width: 0;
`;

export const ButtonContainer = styled.div`
    height: 40px;
    display: flex;
    gap: 16px;
`;

export const CardStyled = styled(Card)`
    padding: 0px !important;

    overflow: hidden;
`;

export const ExpansionPanelStyled = styled(ExpansionPanel)<{ isExpanded: boolean }>`
    & > div:first-child {
        background-color: ${({ isExpanded }) =>
            isExpanded ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};
    }
`;
