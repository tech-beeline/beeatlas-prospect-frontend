import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1;
    min-height: 0;
    padding: 24px;

    overflow-y: auto;

    > * {
        flex-shrink: 0;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const ButtonContainer = styled.div`
    display: flex;

    width: 100%;
    height: 88px;
    flex-shrink: 0;
    gap: 16px;
    background-color: var(--color-background-base);
    padding: 16px 24px 24px;

    border-top: 1px solid var(--color-divider);

    > button {
        width: 100%;
    }
`;
