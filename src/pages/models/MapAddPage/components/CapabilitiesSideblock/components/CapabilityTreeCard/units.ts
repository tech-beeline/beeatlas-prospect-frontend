import { IconButton } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const CapabilityCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    min-height: 48px;
    width: fit-content;

    padding: 4px 16px;

    background-color: var(--color-background-base);

    border-radius: 12px;

    user-select: none;
    cursor: pointer;
`;

export const ArrowContainer = styled.div`
    min-width: 20px;
    min-height: 20px;
`;

export const IconButtonStyled = styled(IconButton)<{ isOpen: boolean }>`
    transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : '')};

    transition: transform 0.25s ease-out;
`;
