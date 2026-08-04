import styled from '@emotion/styled';

import { IconButton } from 'components/ui';

export const CapabilityCard = styled.div<{ isUsed: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    min-height: 48px;
    width: fit-content;

    padding: 4px 16px;

    background-color: var(--color-background-base);

    opacity: ${({ isUsed }) => (isUsed ? '0.48' : '1')};

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
