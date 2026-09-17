import styled from '@emotion/styled';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
`;

export const Header = styled.div`
    padding: 20px 16px 0;
`;

export const SearchContainer = styled.div`
    padding: 24px 16px 0;
`;

export const ErrorContainer = styled.div`
    padding: 16px 16px 0;
`;

export const Results = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;

    min-height: 0;
    padding: 24px 16px;

    overflow-y: auto;
`;

export const CapabilityCard = styled.label`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 16px;

    border: 1px solid var(--color-border);
    border-radius: 12px;

    cursor: pointer;
`;

export const CapabilityInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`;

export const CapabilityType = styled.div`
    color: var(--color-text-inactive);

    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
    text-transform: uppercase;
`;

export const LoadingState = styled.div`
    display: flex;
    flex-direction: column;

    padding: 24px;
`;

export const EmptyState = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Footer = styled.div`
    display: flex;
    gap: 16px;

    padding: 16px 16px 24px;

    border-top: 1px solid var(--color-divider);

    & > * {
        flex: 1;
    }
`;
