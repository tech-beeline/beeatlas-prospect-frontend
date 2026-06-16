import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
`;

export const ApisContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin-top: -12px;
`;
