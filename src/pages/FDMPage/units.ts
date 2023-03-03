import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    display: flex;

    padding-left: 56px;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100vh;
    padding: 94px 32px 0;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};

    border-left: 1px solid ${theme.colors.divider};

    overflow: auto;
`;

export const Container = styled.div`
    position: relative;
    /* width: 717px; */
    height: 100%;
    width: 100%;
    /* margin-right: auto; */
    /* min-width: 700px; */

    /* text-align: justify; */
`;

export const H4 = styled.h4`
    font-weight: 500;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.2px;

    margin: 8px 0;
`;

export const JustText = styled.p`
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;
`;

export const GrayText = styled.p`
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;
    white-space: pre-line;

    color: ${theme.colors.textInactive};
`;

export const SearchContainer = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
`;

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    margin-top: 32px;
`;

export const NoFoundBlock = styled.div`
    width: 410px;
    height: 44px;
    margin-top: 30px;

    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;
    text-align: center;
`;

export const TreeContainer = styled.div<{ activeViewList: number }>`
    /* display: flex; */
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    flex-basis: 0;
    /* gap: 24px; */

    columns: ${({ activeViewList }) => (activeViewList === 0 ? 2 : 1)};
    column-gap: 24px;

    margin: 16px 0;

    /* & > *:nth-child(1n) {
        order: 1;
    }

    & > *:nth-child(2n) {
        order: 2;
    } */

    @media only screen and (max-width: 1130px) {
        columns: 1;
    }
`;

export const MockWrapperNoChild = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    width: 400px;
    margin: 20px auto;

    text-align: center;
`;

export const MockWrapper = styled(MockWrapperNoChild)`
    display: inline-block;

    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    margin-top: 0;
`;

export const Image = styled.img`
    width: 200px;
    height: 200px;
`;

export const MockText = styled(GrayText)`
    font-weight: 500;
`;

export const ListSwitcherWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    margin-top: 20px;
`;
