import styled from '@emotion/styled';

export const Overlay = styled.div`
    @media (max-width: 1400px) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background: rgba(25, 28, 52, 0.24);

        z-index: 102;
    }

    @media (min-width: 1401px) {
        display: none;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 400px;
    min-width: 400px;
    height: 100%;

    border-left: 1px solid var(--color-divider);

    z-index: 1;

    @media (max-width: 1400px) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;

        background-color: var(--color-background-base);
        z-index: 103;
    }
`;

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    height: calc(100vh - 88px);

    padding: 24px;

    overflow: auto;
`;

export const ButtonContainer = styled.div`
    display: flex;

    width: 100%;
    height: 88px;
    padding: 24px;
    border-top: 1px solid var(--color-divider);
    > Button {
        width: 100%;
    }
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;
