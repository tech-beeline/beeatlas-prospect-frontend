import styled from '@emotion/styled';

import { IconButton } from 'components/ui';
import { Banner } from 'components/ui';

export const TitleWrapper = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    color: var(--color-text-active);

    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
    padding-top: 24px;
`;

export const BannerStyled = styled(Banner)`
    white-space: pre-line;
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
`;

export const ButtonContainer = styled.div`
    /* position: absolute;
    bottom: 0;
    right: 0; */

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    width: 100%;
    padding: 30px 0 16px 0;
`;

export const BorderBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    height: fit-content;
    width: 100%;
    padding: 16px;

    border-radius: var(--size-border-radius-x6);
    border: 1px solid var(--color-palette-grey-200);
`;

export const SubTitle = styled.h4`
    height: 24px;

    font-size: var(--font-size-body1);
    font-weight: var(--font-weight-medium);
    line-height: var(--font-line-height-body1);

    margin-bottom: -16px;

    color: var(--color-text-active);
`;

export const SubTitleWithoutMargin = styled.h4`
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

export const TextCheckboxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const NameFlexContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 24px;
`;

export const CheckboxContainer = styled.div<{ marginTop?: boolean }>`
    margin-top: ${({ marginTop }) => (marginTop ? '12px' : '0px')};
`;

export const IconButtonStyled = styled(IconButton)`
    color: var(--color-text-active);
`;

export const GrowContainer = styled.div`
    flex: 1;
`;

export const MockButton = styled.div`
    width: 48px;
`;
