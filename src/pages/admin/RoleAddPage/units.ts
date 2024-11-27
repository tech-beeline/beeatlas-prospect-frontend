import styled from '@emotion/styled';

import { Checkbox } from 'components/form';

export const PageWrapper = styled.div`
    position: relative;

    width: 100%;
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
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
    right: 54px;

    height: 95px;

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

    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-base);

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

    color: var(--color-border-error);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    &:hover {
        & > .dsb_icon--red {
            background: transparent;
        }
    }

    & > .dsb_icon--red {
        background: var(--color-background-base);
    }
`;

export const PermissionsContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin: 28px 24px;
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 48px;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const CheckboxStyled = styled(Checkbox)`
    user-select: none;
`;

export const NotFoundContainer = styled.div`
    margin-top: 200px;
`;
