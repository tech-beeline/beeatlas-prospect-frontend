import styled from '@emotion/styled';

import { theme } from 'styles';

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
    line-height: 22px;

    color: ${theme.colors.textActive};
`;

export const Email = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: 18px;

    color: ${theme.colors.textLink};
`;
