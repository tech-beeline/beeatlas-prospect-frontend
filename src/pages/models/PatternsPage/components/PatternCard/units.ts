import styled from '@emotion/styled';

export const Card = styled.div`
    max-width: 100%;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    overflow: hidden;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 24px;

    border-top: 1px solid var(--color-divider);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const MarginContainer = styled.div`
    margin-top: 12px;

    max-width: 100%;
`;

export const ChipsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    max-width: 100%;
`;
