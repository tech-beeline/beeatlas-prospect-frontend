import styled from '@emotion/styled';

export const SearchCard = styled.div<{ maxWidth?: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 12px 16px;

    ${({ maxWidth }) => maxWidth && `max-width: 648px;`}

    border-radius: var(--size-border-radius-x6);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    overflow: hidden;
    word-break: break-word;
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const BannerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    max-width: 460px;
    padding: 0px 16px;
`;

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EndpointContainer = styled.div<{ hovered: boolean }>`
    position: relative;

    display: flex;
    gap: 24px;

    &:hover {
        & > div:last-child {
            opacity: 1;
            pointer-events: auto;
            z-index: 101;
        }

        & > div:first-child {
            background-color: var(--color-background-base-hover);
            & > div:last-child {
                opacity: 1;
            }
        }
    }

    ${({ hovered }) =>
        hovered &&
        `
        & > div:last-child {
            opacity: 1;
            pointer-events: auto;
            z-index: 101;
        }

        & > div:first-child {
            background-color: var(--color-background-base-hover);
            & > div:last-child {
                opacity: 1;
            }
        }
        `}
`;

export const EndpointSearchCard = styled(SearchCard)<{ hasDeployments: boolean }>`
    width: calc((100% - 16px) / 2);

    height: fit-content;

    cursor: ${({ hasDeployments }) => (hasDeployments ? 'default' : 'pointer')};
`;

const opaqueSelectedBackground = `
    background:
        linear-gradient(
            var(--color-background-base-selected),
            var(--color-background-base-selected)
        ),
        var(--color-background-base);
`;

export const EndpointServersSearchCard = styled(EndpointSearchCard)`
    position: absolute;
    top: 0;
    right: 0;

    opacity: 0;
    pointer-events: none;

    ${opaqueSelectedBackground}

    &&:hover {
        opacity: 1;
        pointer-events: auto;
        z-index: 102;
        ${opaqueSelectedBackground}
    }
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

export const PaginationContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;
