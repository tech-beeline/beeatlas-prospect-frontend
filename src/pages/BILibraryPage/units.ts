import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    height: calc(100vh - 64px);

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    overflow-y: scroll;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
`;

export const MarginBlock = styled.div`
    height: 64px;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 32px 52px 0 108px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CardContainer = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
    gap: 24px;

    margin-top: 24px;
    padding-bottom: 32px;
`;

export const CardColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 100px;
`;
