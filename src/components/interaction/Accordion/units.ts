import styled from '@emotion/styled';

import { Expand } from 'components/other';

import { ReactComponent as ArrowSVG } from './images/arrow.svg';

export const Container = styled.div`
    height: max-content;
    width: 100%;
    /* padding: 24px 0; */

    border: 1px solid rgba(25, 28, 52, 0.18);
    border-radius: 16px;

    & > *:not(:last-child) {
        border-bottom: 1px solid rgba(25, 28, 52, 0.18);
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TitleBlock = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 80px;
    width: 100%;

    padding: 0 24px;

    font-weight: 500;
    font-size: 19px;
    line-height: 24px;

    cursor: pointer;
`;

export const ArrowIcon = styled(ArrowSVG)<{ isOpen: boolean }>`
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'rotate(0deg)')};

    transition: transform 0.2s ease-in-out;
`;

export const ExpandStyled = styled(Expand)`
    padding: 24px;

    font-weight: 400;
    font-size: 19px;
    line-height: 24px;
`;
