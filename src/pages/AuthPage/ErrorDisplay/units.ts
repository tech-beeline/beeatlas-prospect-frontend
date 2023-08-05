import styled from '@emotion/styled';

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ErrorTitle = styled.p`
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    font-weight: var(--font-weight-bold);
`;

export const ErrorDescription = styled.p`
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
`;

export const ErrorIcon = styled.img`
    height: 120px;
    width: 120px;
`;
