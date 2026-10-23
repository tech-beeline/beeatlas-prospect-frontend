import styled from '@emotion/styled';

export const Card = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    color: inherit;
    font: inherit;
    text-align: left;
    background-color: var(--color-background-base);
    border: 1px solid var(--color-divider);
    border-radius: 12px;
    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    min-width: 0;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
