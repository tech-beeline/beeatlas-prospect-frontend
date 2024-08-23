import styled from '@emotion/styled';

export const CapabilityCard = styled.div<{ dragged: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    width: fit-content;

    padding: 4px 16px;

    background-color: var(--color-background-base);

    border-radius: 12px;

    box-shadow: ${({ dragged }) =>
        dragged ? '0px 2px 10px 0px rgba(0, 0, 0, 0.08),0px 2px 8px 0px rgba(0, 0, 0, 0.08)' : ''};

    user-select: none;
    cursor: pointer;
`;
