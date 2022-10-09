import styled from '@emotion/styled';

import { theme } from 'styles';

import { ReactComponent as ArrowSVG } from './images/arrow.svg';

export const PivotArrow = styled(ArrowSVG)<{ isOpen: boolean }>`
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};

    transition: transform 0.25s ease-out;

    & > * {
        fill: ${({ color = theme.colors.textActive }) => color};
    }
`;
