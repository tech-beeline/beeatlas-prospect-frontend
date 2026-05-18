import styled from '@emotion/styled';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100vh;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    padding: 24px;

    max-height: calc(100vh - 88px);

    overflow-y: auto;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: -8px;
`;

export const AxisContainer = styled.div`
    margin-top: 12px;
    margin-bottom: -8px;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-right: 16px;

    margin-left: 16px;
    margin-bottom: -8px;
`;

export const MetricTitleContainer = styled.div`
    margin-bottom: -16px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    padding: 16px 24px 24px;

    border-top: 1px solid var(--color-divider);
`;

export const ButtonWrapper = styled.div`
    flex: 1;
`;

export const MetricsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const MetricCard = styled.div`
    cursor: pointer;

    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 24px 16px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-base);
`;

export const MetricCardTop = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

export const TwoFieldsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`;
