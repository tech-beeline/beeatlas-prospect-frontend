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

export const EndpointContainer = styled.div`
    position: relative;

    display: flex;
    gap: 24px;

    &:hover {
        & > div:last-child {
            opacity: 1;
        }

        & > div:first-child {
            background-color: var(--color-background-base-hover);
            & > div:last-child {
                opacity: 1;
            }
        }
    }
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

export const EndpointSearchCard = styled(SearchCard)`
    width: calc((100% - 16px) / 2);

    height: fit-content;
`;

export const EndpointServersSearchCard = styled(EndpointSearchCard)`
    position: absolute;
    top: 0;
    right: 0;

    opacity: 0;

    background-color: var(--color-background-base-selected);

    z-index: 100;

    &:hover {
        opacity: 1;
        z-index: 101;
    }
`;

export const SearchCardTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SearchCardTextGapContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    flex: 1;
`;

export const ArrowContainer = styled.div`
    min-width: 24px;
    width: 24px;

    opacity: 0;
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

export const BannerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    max-width: 460px;
    padding: 0px 16px;
`;
