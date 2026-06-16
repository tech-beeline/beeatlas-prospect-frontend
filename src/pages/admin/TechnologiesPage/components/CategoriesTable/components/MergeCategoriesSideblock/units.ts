import styled from '@emotion/styled';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100vh;
`;

export const ContentContainer = styled.div`
    padding: 20px 16px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 24px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-end;

    padding: 16px 16px 24px;

    border-top: 1px solid var(--color-divider);
`;

export const TextFieldContainer = styled.div`
    position: relative;

    width: 100%;
`;

export const MenuBlock = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0;

    transform: translateY(100%);

    flex-direction: column;

    padding: 8px 0px;
    width: 100%;

    background-color: var(--color-background-medium);

    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 4px 30px rgba(0, 0, 0, 0.1);

    z-index: 1000;
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;

    height: 48px;

    padding: 12px 16px;

    color: var(--color-text-active);

    cursor: pointer;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;
