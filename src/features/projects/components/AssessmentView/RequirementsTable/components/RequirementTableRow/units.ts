import styled from '@emotion/styled';

export const TitleCell = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
`;

export const Description = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;

    max-width: fit-content;
`;
