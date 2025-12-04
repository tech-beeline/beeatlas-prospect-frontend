import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
`;

export const SearchContainer = styled.div`
    display: flex;
    gap: 24px;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 48px;
    left: 0px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    width: calc(100% - 140px);

    padding: 24px;

    overflow-y: auto;

    box-shadow: 0px 6px 38px 0px rgba(0, 0, 0, 0.16), 0px 0px 10px 0px rgba(0, 0, 0, 0.08);

    z-index: 2;

    background-color: var(--color-background-base);

    border-radius: var(--size-border-radius-x6);
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    margin-top: 8px;
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

export const SearchCardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 12px;
`;

export const SubtitleContainer = styled.div`
    padding-left: 16px;
    padding-bottom: 12px;
`;
