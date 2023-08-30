import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as SelectSVG } from './images/select-icon.svg';

export const PageWrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    height: 100vh;
    padding: 0 88px 96px;

    background-color: var(--color-background-base);

    /* overflow: hidden; */
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);

    color: var(--color-text-active);
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    left: 0;

    /* width: fit-content; */
    width: 100%;
    padding: 96px 0 8px;

    background-color: var(--color-background-base);

    z-index: 6;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    width: 100%;
    margin-bottom: 16px;
`;

export const SubTitle = styled(Title)`
    color: var(--color-text-inactive);
`;

export const SelectIcon = styled(SelectSVG)`
    cursor: pointer;
`;

export const ContentWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    gap: 100px;

    width: 100%;
    max-width: 1400px;
    margin-top: 20px;
`;

export const RadarWrapper = styled.div<{ isActive?: boolean }>`
    position: absolute;
    top: 0;
    right: 0;

    width: 720px;
    height: 700px;

    opacity: ${({ isActive }) => (isActive ? '1' : '0')};
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};

    transition: all 0.25s ease-in-out;

    svg {
        width: 720px;
        height: 700px;
    }
`;

export const CircleStyled = styled.circle`
    cursor: pointer;
`;

export const TooltipContainer = styled.div<{ isVisibleHint: boolean }>`
    max-width: 360px;
    width: max-content;
    padding: 4px 8px;

    background-color: var(--color-background-inverse);

    border-radius: var(--size-border-radius-x4);

    text-align: start;

    z-index: 30;

    transition: opacity ${({ isVisibleHint }) => (isVisibleHint ? '0.2s' : '0s')} ease-in-out;

    ${({ isVisibleHint }) =>
        isVisibleHint
            ? css`
                  visibility: visible;
                  opacity: 1;
              `
            : css`
                  visibility: hidden;
                  opacity: 0;
              `};
`;

export const HintText = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);

    color: var(--color-text-active-inverse);

    user-select: none;

    white-space: pre-line;
`;
