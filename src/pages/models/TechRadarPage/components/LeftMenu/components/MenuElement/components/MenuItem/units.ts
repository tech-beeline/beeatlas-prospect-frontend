import styled from '@emotion/styled';

import { IconButton } from 'components/ui';

export const Item = styled.div<{ isActive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 300px;
    height: 48px;
    padding: 12px 24px;

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    border-radius: var(--size-border-radius-x6);

    background-color: ${({ isActive }) => isActive && 'var(--color-background-base-hover)'};

    color: var(--color-text-active);

    transition: background-color 0.25s ease-in-out;

    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            background-color: var(--color-background-base-hover);
        }
    }

    &:hover > span {
        visibility: visible;
    }

    span {
        visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
    }
`;

export const IconsContainer = styled.div<{ hidden?: boolean }>`
    display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
    align-items: center;
    gap: 8px;
`;

export const IconButtonStyled = styled(IconButton)<{ visible: boolean }>`
    span {
        visibility: ${({ visible }) => (visible ? 'visible' : '')};
    }
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;
