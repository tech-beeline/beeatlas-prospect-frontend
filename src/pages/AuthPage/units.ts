import styled from '@emotion/styled';

import { Paper } from 'components/containers';
import { IconButton } from 'components/interaction';

import { theme } from 'styles';

export const AuthPageWrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: auto;
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const PaperStyled = styled(Paper)`
    display: inline-flex;
    flex-direction: column;
    gap: 24px;

    max-width: 426px;
    margin: 16px 16px 24px;
`;

export const IconButtonStyled = styled(IconButton)`
    position: absolute;
    left: -60px;
    top: 60px;
`;

// TODO: Вероятно, в отдельный компонент
export const SimpleText = styled.p`
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    color: ${theme.colors.disabledGray};
`;

export const FooterBlock = styled.div`
    width: 390px;
    margin: auto 0 20px;

    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    text-align: center;

    color: ${theme.colors.disabledGray};
`;

// ------MobileId-------

export const MobileIdContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
`;

export const PhoneTimeContainer = styled.div`
    display: flex;
    justify-content: space-between;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

// ----------------
