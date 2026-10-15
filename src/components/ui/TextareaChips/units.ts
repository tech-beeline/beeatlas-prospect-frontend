import styled from '@emotion/styled';

export const Container = styled.div<{
    $error: boolean;
    $disabled: boolean;
    $hasTags: boolean;
}>`
    position: relative;
    box-sizing: border-box;
    min-height: 48px;
    padding: ${({ $hasTags }) => ($hasTags ? '32px 16px 8px' : '22px 16px 4px')};
    border: 1px solid ${({ $error }) => ($error ? 'var(--color-border-error)' : 'transparent')};
    border-radius: 12px;
    background: var(--color-control-background);
    opacity: ${({ $disabled }) => ($disabled ? 0.48 : 1)};
    cursor: ${({ $disabled }) => ($disabled ? 'default' : 'text')};

    &:hover {
        border-color: ${({ $error, $disabled }) =>
            $disabled
                ? 'transparent'
                : $error
                ? 'var(--color-border-error)'
                : 'var(--color-border-focus)'};
    }

    .dsb_chip {
        background: var(--color-control-background-hover);
    }

    &:focus-within > label {
        top: 6px;
        transform: none;
        font-size: 13px;
        transform-origin: top left;
    }

    &:focus-within {
        border-color: ${({ $error }) =>
            $error ? 'var(--color-border-error)' : 'var(--color-border-focus)'};
    }
`;

export const Label = styled.label<{ $filled: boolean }>`
    position: absolute;
    top: ${({ $filled }) => ($filled ? '6px' : '50%')};
    transform: ${({ $filled }) => ($filled ? 'none' : 'translateY(-50%)')};
    left: 16px;
    color: var(--color-text-inactive);
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: ${({ $filled }) => ($filled ? '13px' : '17px')};
    line-height: 22px;
    transform-origin: top left;
    transition: all 100ms;
    cursor: text;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Input = styled.textarea<{ $hasTags: boolean }>`
    flex: 1;
    width: 100%;
    min-width: 100px;
    box-sizing: border-box;
    height: ${({ $hasTags }) => ($hasTags ? '32px' : '20px')};
    padding: ${({ $hasTags }) => ($hasTags ? '5px 0' : '0')};
    border: none;
    outline: none;
    resize: none;
    background: transparent;
    color: var(--color-text-active);
    font: inherit;
    line-height: ${({ $hasTags }) => ($hasTags ? '22px' : '20px')};
`;

export const Helper = styled.div<{ $error: boolean }>`
    margin: 4px 16px 0;
    color: ${({ $error }) => ($error ? 'var(--color-status-error)' : 'var(--color-text-inactive)')};
    font-size: var(--font-size-body3);
`;
