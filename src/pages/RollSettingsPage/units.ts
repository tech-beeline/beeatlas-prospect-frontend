import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    height: 100vh;
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

export const RolesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    width: 100%;
    padding: 8px 0;
`;

export const Role = styled.div`
    display: flex;

    width: 100%;
    max-width: 340px;
    min-width: 300px;
    height: 76px;

    padding: 24px;

    font-weight: 700;
    font-size: 20px;
    line-height: 28px;

    border: 1px solid;
    border-color: ${theme.colors.divider};
    border-radius: 12px;

    transition: all 0.25s ease-in-out;

    cursor: pointer;

    & > span {
        font-size: 24px;

        padding-top: 2px;

        opacity: 0;

        transition: all 0.25s ease-out;
    }

    &:hover {
        color: #1a73e8;

        border-radius: 24px;
    }

    &:hover > span {
        transform: translateX(18px);

        opacity: 1;
    }

    &:hover > * {
        color: ${theme.colors.textLink};
    }
`;
