import styled from '@emotion/styled';

export const Card = styled.div`
    border: 1px solid var(--color-divider);
    border-radius: 12px;
    overflow: hidden;
`;

export const Header = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    color: inherit;
    font: inherit;
    text-align: left;
    background-color: var(--color-background-base);
    border: 0;
    cursor: pointer;
`;

export const Status = styled.div`
    margin-left: auto;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 16px;
    border-top: 1px solid var(--color-divider);
`;

export const Metrics = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
`;

export const Metric = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
