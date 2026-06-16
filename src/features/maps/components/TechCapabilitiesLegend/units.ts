import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    gap: 16px;
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const Circle = styled.div<{ color: string }>`
    height: 24px;
    width: 24px;

    border-radius: 50%;

    background-color: ${({ color }) => color};
`;

export const Text = styled.div`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
`;
