import styled from '@emotion/styled';

export const ClampedFileName = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    line-height: 1.4em;
    max-height: 2.8em;
    max-width: max-content;
    white-space: normal;
`;
