import styled from '@emotion/styled';

export const Container = styled.div<{ level: number }>`
    display: flex;
    align-items: center;
    gap: 16px;

    min-height: 48px;
    padding: 6px 16px;
    margin-left: ${({ level }) => `${level * 36}px`};

    border-radius: var(--size-border-radius-x6);

    overflow: hidden;
    word-break: break-all;

    &:hover {
        background-color: var(--color-background-base-hover);
    }
`;

export const IconButtonContainer = styled.div`
    min-width: 20px;
    min-height: 20px;
    max-width: 20px;
    max-height: 20px;
`;
