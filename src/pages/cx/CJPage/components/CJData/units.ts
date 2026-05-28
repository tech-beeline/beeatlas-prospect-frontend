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
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x6);
    height: ${({ hasButtons }) => (hasButtons ? 'calc(100vh - 96px)' : '100vh')};
    overflow-y: auto;
    padding: var(--size-spacing-x6);
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;

    gap: var(--size-spacing-x6);
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
