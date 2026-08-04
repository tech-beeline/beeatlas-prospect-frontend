import styled from '@emotion/styled';

export const CapabilityCard = styled.div<{ dragged?: boolean; isUsed?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    width: ${({ dragged }) => (dragged ? 'fit-content' : 'auto')};

    padding: 4px 16px;

    opacity: ${({ isUsed }) => (isUsed ? '0.48' : '1')};

    background-color: var(--color-background-base);

    border-radius: 12px;

    box-shadow: ${({ dragged }) =>
        dragged ? '0px 2px 10px 0px rgba(0, 0, 0, 0.08),0px 2px 8px 0px rgba(0, 0, 0, 0.08)' : ''};

    user-select: none;
    cursor: pointer;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const DescriptionContainer = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    line-clamp: 10;
    -webkit-box-orient: vertical;
`;
