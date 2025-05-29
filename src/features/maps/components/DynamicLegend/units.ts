import styled from '@emotion/styled';

export const Wrapper = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
`;

export const TilesWrapper = styled.div`
    display: flex;
    gap: 1px;

    width: 100%;
`;

export const Tile = styled.div<{ color: string; first?: boolean; last?: boolean }>`
    height: 24px;
    width: 100%;

    background-color: ${({ color }) => color};

    border-top-left-radius: ${({ first }) => (first ? '12px' : '0px')};
    border-bottom-left-radius: ${({ first }) => (first ? '12px' : '0px')};

    border-top-right-radius: ${({ last }) => (last ? '12px' : '0px')};
    border-bottom-right-radius: ${({ last }) => (last ? '12px' : '0px')};
`;

export const TextWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
`;
