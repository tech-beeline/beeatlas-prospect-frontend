import styled from '@emotion/styled';

export const TabsRoot = styled.div`
    & > * {
        box-sizing: border-box;
    }
`;

export const TabsHeader = styled.div`
    position: relative;
    overflow: hidden;
`;

export const TabsHeaderTabs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const TabsIndicator = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background-color: var(--color-background-brand, #fdd835);
    border-radius: 4px 4px 0 0;
    transition: all 200ms ease-in-out;
`;

export const TabsBody = styled.div``;

export const ScrollerRoot = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;

    .dsb_tabs-scroller__nav-button {
        position: absolute;
        cursor: pointer;
        display: flex;
        border-radius: unset;
        border: none;
    }

    .dsb_tabs-scroller__nav-button--left-arrow {
        left: 0;
        background: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 0%,
            var(--color-background-base) 33.71%
        );
    }

    .dsb_tabs-scroller__nav-button--right-arrow {
        right: 0;
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            var(--color-background-base) 33.71%
        );
    }
`;

export const ScrollerContent = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
`;
