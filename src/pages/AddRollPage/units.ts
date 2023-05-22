// import { Divider } from '@beeline/design-system-react';
import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    position: relative;

    height: 100%;
    width: 100%;
    padding: 64px 54px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const TitleFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TitleFlexGap = styled(TitleFlex)`
    position: relative;

    display: flex;
    justify-content: initial;
    align-items: center;
    gap: 8px;

    & > span {
        padding-top: 16px;

        cursor: pointer;
    }
`;

export const BottomBlock = styled.div<{ isShown: boolean }>`
    position: fixed;
    bottom: ${({ isShown }) => (isShown ? 0 : '-95px')};

    height: 95px;
    width: calc(100% - 256px - (2 * 54px));

    transition: all 0.25s ease-in-out;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: right;
    margin-left: auto;
    align-items: center;
    gap: 16px;
`;

// export const DividerStyled = styled(Divider)`
//     /* height: 95px; */
//     margin-top: auto;
// `;

export const Dropdown = styled.div`
    position: absolute;
    top: 70px;
    left: 300px;

    width: 280px;
    height: 62px;
    padding: 8px 0;

    border-radius: ${theme.borderRadius};

    background-color: ${theme.colors.backgroundLow};

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    user-select: none;
    cursor: pointer;

    z-index: 10;
`;

export const DropdownItem = styled.p`
    display: flex;
    align-items: center;
    gap: 8px;

    height: 46px;
    padding: 12px 16px;

    color: ${theme.colors.borderError};

    font-weight: 400;
    font-size: 17px;
    line-height: 22px;

    &:hover {
        background-color: ${theme.colors.backgroundHover};
    }

    &:hover {
        & > .dsb_icon--red {
            background: transparent;
        }
    }

    & > .dsb_icon--red {
        background: ${theme.colors.backgroundLow};
    }
`;
