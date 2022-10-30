import styled from '@emotion/styled';

export const Title = styled.h3`
    display: flex;
    /* align-items: center; */
    gap: 16px;

    font-weight: 400;
    font-size: 34px;
    line-height: 44px;

    width: 100%;
    margin: 40px 0 12px;

    transition: color 0.25s ease-out;

    cursor: pointer;

    & > span {
        margin-top: 10px;
    }
`;
