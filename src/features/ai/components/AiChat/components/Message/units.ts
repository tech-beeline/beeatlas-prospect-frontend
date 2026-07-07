import styled from '@emotion/styled';

interface AlignmentProps {
    $isUser: boolean;
}

export const Container = styled.div<AlignmentProps>`
    display: flex;
    flex-direction: column;
    align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
    gap: 4px;

    max-width: 100%;
`;

export const SenderLabel = styled.div`
    padding: 0 4px;
`;

export const Bubble = styled.div<AlignmentProps & { $isError?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 8px;

    max-width: 85%;
    padding: 12px 16px;
    border-radius: 12px;

    background: ${({ $isUser, $isError }) =>
        $isError
            ? 'var(--color-status-error-background)'
            : $isUser
            ? 'var(--color-accent-lemon-background)'
            : 'var(--color-status-neutral-background)'};
`;

export const TextContent = styled.div`
    white-space: pre-wrap;
    word-break: break-word;
`;

export const MarkdownContent = styled.div`
    word-break: break-word;

    font-size: var(--font-size-body2);
    font-weight: var(--font-weight-body2);
    line-height: var(--font-line-height-body2);

    * {
        white-space: normal;
    }

    p {
        margin: 0;

        &:not(:last-child) {
            margin-bottom: 8px;
        }
    }

    ul,
    ol {
        margin: 0;
        padding-left: 20px;
    }

    li:not(:last-child) {
        margin-bottom: 4px;
    }

    a {
        color: var(--color-text-link);
        cursor: pointer;
    }

    strong {
        font-weight: var(--font-weight-subtitle2);
    }

    code {
        color: var(--color-status-error);
    }

    pre {
        margin: 8px 0;
        padding: 8px 12px;
        border-radius: 8px;
        background-color: rgba(25, 28, 52, 0.1);
        overflow-x: auto;

        > code {
            color: var(--color-text-active);
        }
    }
`;

export const Timestamp = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const ProgressBar = styled.div`
    position: relative;

    height: 4px;
    border-radius: 2px;

    background: var(--color-control-background);
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;

        width: 60%;
        height: 100%;
        border-radius: 2px;

        background: linear-gradient(
            90deg,
            var(--color-status-warning) 0%,
            var(--color-accent-purple) 100%
        );

        animation: message-progress 1.5s ease-in-out infinite alternate;
    }

    @keyframes message-progress {
        from {
            width: 35%;
        }

        to {
            width: 65%;
        }
    }
`;
