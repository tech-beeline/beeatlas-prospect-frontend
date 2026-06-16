import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const Wrapper = styled.div<{ isOpen: boolean }>`
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 344px;
    min-height: 50px;
    padding: 16px;

    background-color: var(--color-background-inverse);
    color: var(--color-text-active-inverse);

    border-radius: var(--size-border-radius-x6);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

    z-index: 1001;

    transition: all 0.25s ease-out;
`;

export const TextButton = styled.button`
    width: fit-content;
    height: 100%;

    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-subtitle3);
    line-height: var(--font-line-height-subtitle3);

    color: var(--color-chart-blue-active);

    cursor: pointer;
`;

export const IconButtonWrapper = styled(Icon)`
    cursor: pointer;
    color: var(--color-background-base);
`;
