import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div<{ isOpen: boolean }>`
    position: absolute;
    left: 50%;
    bottom: ${({ isOpen }) => (isOpen ? '50px' : '-50px')};
    transform: translateX(-50%);

    width: 344px;
    min-height: 50px;
    padding: 16px;

    background-color: ${theme.colors.backgroundInverse};
    color: ${theme.colors.textActiveInverse};

    border-radius: ${theme.borderRadius};

    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    z-index: 1001;

    transition: bottom 0.25s ease-out;
`;
