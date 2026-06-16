import styled from '@emotion/styled';

export const Wrapper = styled.p`
    white-space: pre-wrap;
`;

export const TargetLink = styled.a`
    color: #1976d2;

    text-decoration: underline;
    text-decoration-color: transparent;

    cursor: pointer;

    transition: all 0.25s ease-in-out;

    @media (hover: hover) {
        &:hover {
            text-decoration-color: #1976d2;
        }
    }
`;
