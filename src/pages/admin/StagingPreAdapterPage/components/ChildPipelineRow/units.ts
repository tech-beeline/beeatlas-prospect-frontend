import styled from '@emotion/styled';

export const OverflowContainer = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;
