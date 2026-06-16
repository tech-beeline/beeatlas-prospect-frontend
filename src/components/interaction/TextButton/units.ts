import styled from '@emotion/styled';

export const TextButton = styled.button`
    width: fit-content;

    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    text-decoration: underline;

    color: inherit;

    transition: color 0.25s ease-out;

    &:hover {
        color: var(--color-background-brand);
    }
`;
