import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as SelectSVG } from './images/select-icon.svg';

export const PageWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 64px);

    display: flex;
    flex-direction: row;

    padding-left: 32px;

    background-color: var(--color-background-base);
`;

export const PageContainer = styled.div`
    width: 100%;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);

    color: var(--color-text-active);
`;

export const Header = styled.div`
    width: 100%;
    padding: 32px 0 8px;

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
    gap: 70px;

    width: 100%;
    height: calc(100% - 186px);

    padding-top: 20px;
`;

export const RadarsContainer = styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
`;

export const RadarWrapper = styled.div<{ isActive?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;

    width: 720px;
    height: 720px;

    margin-top: 10px;
    margin-left: 30px;

    opacity: ${({ isActive }) => (isActive ? '1' : '0')};
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};

    transition: all 0.25s ease-in-out;

    svg {
        width: 720px;
        height: 700px;
    }
`;

export const CircleStyled = styled.circle<{ isVisible?: boolean }>`
    cursor: pointer;

    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export const PolygonStyled = styled.polygon<{ isVisible?: boolean }>`
    cursor: pointer;

    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
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
