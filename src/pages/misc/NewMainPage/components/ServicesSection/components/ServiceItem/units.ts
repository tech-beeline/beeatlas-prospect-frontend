import styled from '@emotion/styled';

export const ServiceItemButton = styled.button`
    display: flex;
    align-items: flex-start;
    gap: 12px;

    width: 100%;
    padding: 0;

    border: none;
    background: none;
    text-align: left;

    cursor: pointer;
`;

export const ServiceItemContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
`;

export const ServiceItemDescription = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
