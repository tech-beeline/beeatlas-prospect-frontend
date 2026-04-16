import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x4);

    width: 100%;
`;

export const Rows = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x8);
`;

export const Row = styled.div`
    display: flex;
    align-items: flex-start;
    gap: var(--size-spacing-x4);

    width: 100%;
`;

export const SelectContainer = styled.div`
    flex: 1;
`;
