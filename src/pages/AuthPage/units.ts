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
    font-size: ${theme.text.normal.fontSize};
    line-height: ${theme.text.normal.lineHeight};

    color: ${theme.colors.disabledGray};
`;

export const FooterBlock = styled.div`
    width: 390px;
    margin: auto 0 20px;

    font-size: ${theme.text.small.fontSize};
    line-height: ${theme.text.small.lineHeight};

    text-align: center;

    color: ${theme.colors.disabledGray};
`;

// ------MobileId-------

export const MobileIdContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-size: ${theme.text.small.fontSize};
    line-height: ${theme.text.small.lineHeight};
`;

export const PhoneTimeContainer = styled.div`
    display: flex;
    justify-content: space-between;

    font-size: ${theme.text.normal.fontSize};
    line-height: ${theme.text.normal.lineHeight};
`;

// ----------------
