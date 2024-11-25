import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    gap: 1px;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Tile = styled.div<{ color: string; first?: boolean; last?: boolean }>`
    width: 80px;
    height: 24px;

    background-color: ${({ color }) => color};

    border-top-left-radius: ${({ first }) => (first ? '12px' : '0px')};
    border-bottom-left-radius: ${({ first }) => (first ? '12px' : '0px')};

    border-top-right-radius: ${({ last }) => (last ? '12px' : '0px')};
    border-bottom-right-radius: ${({ last }) => (last ? '12px' : '0px')};
`;

export const Text = styled.div`
    font-weight: var(--font-weight-body3);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);
`;
