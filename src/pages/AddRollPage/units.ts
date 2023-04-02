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
