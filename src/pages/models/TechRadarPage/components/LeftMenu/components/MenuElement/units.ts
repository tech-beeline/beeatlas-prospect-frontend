import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as ArrowSVG } from '../../images/arrow-icon.svg';
import { ReactComponent as InfoSVG } from '../../images/info-icon.svg';

export const Wrapper = styled.div<{ withScroll?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 4px;

    min-width: 310px;

    ${({ withScroll }) =>
        withScroll &&
        css`
            width: 318px;

            overflow: hidden scroll;
        `}
`;

export const TitleWrapper = styled.div`
    width: 300px;
    padding: 12px 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    cursor: pointer;

    user-select: none;

    border-radius: var(--size-border-radius-x6);

    /* transition: background-color 0.25s ease-in-out; */

    cursor: pointer;

    /* @media (hover: hover) {
        &:hover {
            background-color: rgba(25, 28, 52, 0.08);
        }
    } */
`;

export const Title = styled.h5`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);

    color: var(--color-text-active);
`;

export const TitleSmaller = styled(Title)`
    font-size: var(--font-size-body2);
`;

export const ArrowIcon = styled(ArrowSVG)<{ isreverse: string }>`
    min-width: 24px;
    min-height: 24px;

    transform: ${({ isreverse = '' }) => isreverse && 'rotateX(180deg)'};

    /* color: var(--color-text-active); */

    transition: transform 0.4s ease-in-out;

    & > * {
        fill: var(--color-text-active);
    }
`;

export const InfoIcon = styled(InfoSVG)`
    min-width: 24px;
    min-height: 24px;

    z-index: 5;

    & > * {
        fill: var(--color-text-active);
    }

    &:focus {
        outline: none;
    }
`;

export const NoData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const NoDataImage = styled.img`
    width: 100px;
    height: 100px;
`;

export const NoDataTitle = styled.div`
    margin-top: 16px;

    color: var(--color-text-active);

    text-align: center;

    font-weight: var(--font-weight-h6);
    font-size: var(--font-size-h6);
    line-height: var(--font-line-height-h6);
`;

export const NoDataDescription = styled.div`
    margin-top: 8px;

    text-align: center;

    color: var(--color-text-disabled);

    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;
