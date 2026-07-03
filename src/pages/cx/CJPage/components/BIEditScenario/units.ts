import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 400px;
    min-height: 100%;
`;

export const Content = styled.div<{ hasButtons: boolean }>`
    height: ${({ hasButtons }) =>
        hasButtons ? 'calc(var(--app-height) - 96px)' : 'var(--app-height)'};
    overflow-y: auto;
    padding: 24px;
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
`;

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding-top: 32px;
    overflow-y: auto;
`;

export const LinkBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const LinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const LinkTextField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
`;

export const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    gap: 16px;

    width: 100%;
    height: 96px;
    padding: 24px;

    border-top: 1px solid rgba(25, 28, 52, 0.12);
    > Button {
        width: 100%;
    }
`;
