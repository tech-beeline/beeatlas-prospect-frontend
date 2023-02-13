import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as SelectSVG } from './images/select-icon.svg';

export const PageWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 88px 96px;
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    left: 0;

    width: 100%;
    padding: 96px 0 30px;

    background-color: white;

    z-index: 2;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    width: 100%;
    margin-bottom: 16px;
`;

export const Title = styled.h1`
    font-weight: 500;
    font-size: 26px;
    line-height: 32px;
`;

export const SubTitle = styled(Title)`
    color: rgba(25, 28, 52, 0.7);
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
    max-width: 1200px;
    margin-top: 20px;
`;

export const RadarWrapper = styled.div`
    position: sticky;
    top: 226px;
    right: 0;

    width: 700px;
    height: 700px;

    svg {
        width: 700px;
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

    background-color: #141414;

    border-radius: 8px;

    text-align: start;

    z-index: 3;

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
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;

    color: white;

    user-select: none;

    white-space: pre-line;
`;
