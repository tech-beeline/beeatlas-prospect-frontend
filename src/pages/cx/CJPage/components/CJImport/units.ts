import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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
    gap: 16px;

    width: 100%;
    height: 96px;
    padding: 24px;

    border-top: 1px solid rgba(25, 28, 52, 0.12);
    > Button {
        width: 100%;
    }
`;
