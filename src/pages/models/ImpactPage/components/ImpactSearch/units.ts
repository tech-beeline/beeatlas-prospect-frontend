import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 48px;
    left: 0px;

    width: 100%;

    padding: 24px;

    box-shadow: 0px 6px 38px 0px rgba(0, 0, 0, 0.16), 0px 0px 10px 0px rgba(0, 0, 0, 0.08);

    z-index: 2;

    background-color: var(--color-background-base);

    border-radius: var(--size-border-radius-x6);
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-top: 16px;
    margin-bottom: 24px;
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SearchCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 16px;

    border-radius: var(--size-border-radius-x6);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;
