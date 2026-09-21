import styled from '@emotion/styled';

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
    background-color: var(--color-background-base);
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const ButtonContainer = styled.div`
    align-self: flex-end;

    margin-top: 12px;
`;
