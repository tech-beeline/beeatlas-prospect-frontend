import styled from '@emotion/styled';

import { Divider } from 'components/ui';
import { Button } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    gap: var(--size-spacing-x4);
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const FieldsFlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const FieldsContainer = styled.div<{ marginTop?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;

    &:not(:last-child) {
        margin-bottom: 24px;
    }
`;

export const ChannelsContainer = styled(FieldsContainer)`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;

    margin-top: ${({ marginTop }) => (marginTop ? '32px' : '0px')};
`;

export const SubTitle = styled.h4`
    height: 24px;

    font-size: var(--font-size-body1);
    font-weight: var(--font-weight-medium);
    line-height: var(--font-line-height-body1);

    color: var(--color-text-active);
`;

export const SubTitleSmall = styled.h4`
    margin: 16px 0px;

    font-size: var(--font-size-subtitle3);
    font-weight: var(--font-weight-medium);
    line-height: var(--font-line-height-subtitle3);

    color: var(--color-text-active);
`;

export const ButtonStyled = styled(Button)`
    width: 48px;
    height: 48px;
`;

export const GrowContainer = styled.div`
    flex: 1;
`;

export const DividerStyled = styled(Divider)`
    width: 100%;

    margin-top: 24px;
`;
