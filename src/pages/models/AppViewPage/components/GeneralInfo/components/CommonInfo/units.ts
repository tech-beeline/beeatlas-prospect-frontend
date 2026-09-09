import styled from '@emotion/styled';

import { Table } from 'components/ui';

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

export const StructurizrTitle = styled.div`
    display: flex;
    align-items: center;

    height: 40px;
`;

export const StructurizrContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StructurizrTitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const StructurizrIdContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const ProgressContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    grid-column: 1/-1;
`;

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const DescriptionText = styled.div<{ isExpanded: boolean }>`
    display: -webkit-box;
    ${({ isExpanded }) => (isExpanded ? '' : '-webkit-line-clamp: 5;')}
    -webkit-box-orient: vertical;

    max-width: 800px;

    overflow: hidden;
`;

export const ExpandContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    max-width: fit-content;

    cursor: pointer;
`;

export const IconContainer = styled.div`
    max-height: 18px;

    & > span {
        color: var(--color-text-link);
    }
`;
