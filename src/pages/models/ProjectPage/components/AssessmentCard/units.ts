import styled from '@emotion/styled';

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    min-width: 0;
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
    background-color: var(--color-background-base);
`;

export const Labels = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Metrics = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(44px, auto));
    gap: 24px;
    justify-content: start;
`;

export const MetaInfoContainer = styled.div`
    padding: 12px 0px;
`;
