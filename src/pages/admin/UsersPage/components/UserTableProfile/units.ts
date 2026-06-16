import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    height: 40px;
`;

export const ProfileDataBlock = styled.div``;

export const FullName = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    color: var(--color-text-active);
`;

export const Email = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-link);
`;
