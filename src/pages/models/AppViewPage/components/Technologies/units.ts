import styled from '@emotion/styled';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    height: fit-content;

    padding: 24px;

    border-radius: var(--size-border-radius-x6);
    border: 1px solid var(--color-divider);
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LinksContianer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;
