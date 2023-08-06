import styled from '@emotion/styled';

export const Wrapper = styled.p<{ isActive: boolean }>`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);

    color: ${({ isActive }) =>
        isActive ? 'var(--color-text-inactive)' : 'var(--color-text-link)'};

    cursor: pointer;
`;
