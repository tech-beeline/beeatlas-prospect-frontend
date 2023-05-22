import styled from '@emotion/styled';

export const Title = styled.h3<{ fontSize: string }>`
    display: flex;
    /* align-items: center; */
    gap: 16px;

    font-weight: 400;
    font-size: ${({ fontSize = '34px' }) => fontSize};
    line-height: 44px;

    width: fit-content;
    margin: 40px 0 12px;

    transition: color 0.25s ease-out;

    cursor: pointer;

    & > span {
        margin-top: 10px;
    }
`;
