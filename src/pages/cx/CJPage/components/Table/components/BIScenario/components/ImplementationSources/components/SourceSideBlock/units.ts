import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    width: 480px;
    min-height: 100%;

    color: var(--color-text-active);
`;

export const Content = styled.div<{ hasButtons: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 24px;

    height: ${({ hasButtons }) =>
        hasButtons ? 'calc(var(--app-height) - 96px)' : 'var(--app-height)'};
    padding: 24px;

    overflow-y: auto;
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
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;

    width: 100%;
    height: 96px;
    padding: 24px;

    border-top: 1px solid var(--color-divider);

    > button {
        width: 100%;
    }
`;
