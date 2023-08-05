import styled from '@emotion/styled';
import { theme } from 'styles';

export const TitleWrapper = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    color: ${theme.colors.textActive};

    font-weight: 700;
    font-size: var(--font-size-h5);
    line-height: 28px;
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
    padding-top: 24px;
`;

export const ButtonContainer = styled.div`
    /* position: absolute;
    bottom: 0;
    right: 0; */

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    width: 100%;
    padding: 30px 0 16px 0;
`;

export const BorderBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    height: fit-content;
    width: 100%;
    padding: 16px;

    border-radius: var(--size-border-radius-x6);
    border: 1px solid ${theme.colors.borderGray};
`;

export const SubTitle = styled.h4`
    font-size: var(--font-size-body1);
    font-weight: 500;
    line-height: 24px;

    margin-bottom: -16px;

    color: ${theme.colors.textActive};
`;

export const TextCheckboxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
