import styled from '@emotion/styled';

export const Link = styled.a`
    color: var(--color-palette-blue-600);

    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ScenariosWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
