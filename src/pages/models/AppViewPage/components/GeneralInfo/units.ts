import styled from '@emotion/styled';

export const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(220px, min-content) 1fr;
    gap: 24px;
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const BlurText = styled.div<{ $isBlurred: boolean }>`
    filter: ${(props) => (props.$isBlurred ? 'blur(5px)' : 'none')};
    transition: filter 0.3s ease;
`;
