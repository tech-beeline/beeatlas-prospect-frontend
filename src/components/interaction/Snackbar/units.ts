import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isOpen: boolean }>`
    position: absolute;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 344px;
    min-height: 50px;
    padding: 16px;

    background-color: ${theme.colors.backgroundInverse};
    color: ${theme.colors.textActiveInverse};

    border-radius: var(--size-border-radius-x6);

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

    z-index: 1001;

    transition: all 0.25s ease-out;
`;

export const TextButton = styled.button`
    width: fit-content;
    height: 100%;

    font-weight: 500;
    font-size: 15px;
    line-height: 20px;

    color: ${theme.colors.chartBlue};

    cursor: pointer;
`;
