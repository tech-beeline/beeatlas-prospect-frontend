import styled from '@emotion/styled';

export const ClampedFileName = styled.div<{ lines: number }>`
    display: -webkit-box;
    -webkit-line-clamp: ${({ lines }) => lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    line-height: 1.4em;
    max-height: ${({ lines }) => lines * 1.4}em;
    max-width: max-content;
    white-space: normal;
`;
