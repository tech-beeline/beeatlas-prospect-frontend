import React from 'react';

import errorDefault from './images/error-default.svg';
import errorMessageDontSend from './images/error-message-dont-send.svg';
import errorPhoneNotFound from './images/error-phone-not-found.svg';
import errorRejected from './images/error-rejected.svg';
import errorRetry from './images/error-retry.svg';
import errorSimCardIncorect from './images/error-sim-card-incorect.svg';
import errorSMSDisabled from './images/error-sms-disabled.svg';
import errorWarningMessage from './images/error-warning-message.svg';

import { ErrorOptionsDisplay } from './types';
import * as S from './units';

// TODO: дописать все кейсы и добавить TextButton
export const ErrorDisplay = ({ error }: { error: string }) => {
    switch (error) {
        case ErrorOptionsDisplay.ErrorRetry:
            return (
                <>
                    <S.ErrorIcon src={errorRetry} />

                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но код снова введён неверно</S.ErrorTitle>

                        <S.ErrorDescription>
                            Вход ограничен с целью безопасности. Пожалуйста, авторизуйся другим
                            способом или повтори попытку через 10 мин
                        </S.ErrorDescription>
                    </S.TextContainer>
                </>
            );
        case ErrorOptionsDisplay.ErrorLimitSMS:
            return (
                <>
                    <S.ErrorIcon src={errorRetry} />;
                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но код снова введён неверно</S.ErrorTitle>

                        <S.ErrorDescription>
                            Вход ограничен с целью безопасности. Пожалуйста, авторизуйся другим
                            способом или повтори попытку через 10 мин
                        </S.ErrorDescription>
                    </S.TextContainer>
                </>
            );
        case ErrorOptionsDisplay.ErrorMessageDontSend:
            return (
                <>
                    <S.ErrorIcon src={errorMessageDontSend} />;
                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но код снова введён неверно</S.ErrorTitle>

                        <S.ErrorDescription>
                            Вход ограничен с целью безопасности. Пожалуйста, авторизуйся другим
                            способом или повтори попытку через 10 мин
                        </S.ErrorDescription>
                    </S.TextContainer>
                    ;
                </>
            );
        case ErrorOptionsDisplay.ErrorPhoneNotFound:
            return (
                <>
                    <S.ErrorIcon src={errorPhoneNotFound} />;
                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но код снова введён неверно</S.ErrorTitle>

                        <S.ErrorDescription>
                            Вход ограничен с целью безопасности. Пожалуйста, авторизуйся другим
                            способом или повтори попытку через 10 мин
                        </S.ErrorDescription>
                    </S.TextContainer>
                    ;
                </>
            );
        case ErrorOptionsDisplay.ErrorRejected:
            return (
                <>
                    <S.ErrorIcon src={errorRejected} />
                    <S.TextContainer>
                        <S.ErrorTitle>Ты оклонил запрос на вход</S.ErrorTitle>

                        <S.ErrorDescription>
                            Если это было ошибочное действие, попробуй выполнить повторный вход.
                        </S.ErrorDescription>
                    </S.TextContainer>
                </>
            );
        case ErrorOptionsDisplay.ErrorSMSDisabled:
            return (
                <>
                    <S.ErrorIcon src={errorSMSDisabled} />;
                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но код снова введён неверно</S.ErrorTitle>

                        <S.ErrorDescription>
                            Вход ограничен с целью безопасности. Пожалуйста, авторизуйся другим
                            способом или повтори попытку через 10 мин
                        </S.ErrorDescription>
                    </S.TextContainer>
                </>
            );
        case ErrorOptionsDisplay.ErrorSimCardIncorect:
            return (
                <>
                    <S.ErrorIcon src={errorSimCardIncorect} />;
                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но код снова введён неверно</S.ErrorTitle>

                        <S.ErrorDescription>
                            Вход ограничен с целью безопасности. Пожалуйста, авторизуйся другим
                            способом или повтори попытку через 10 мин
                        </S.ErrorDescription>
                    </S.TextContainer>
                </>
            );
        case ErrorOptionsDisplay.ErrorWarningMessage:
            return (
                <>
                    <S.ErrorIcon src={errorWarningMessage} />;
                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но код снова введён неверно</S.ErrorTitle>

                        <S.ErrorDescription>
                            Вход ограничен с целью безопасности. Пожалуйста, авторизуйся другим
                            способом или повтори попытку через 10 мин
                        </S.ErrorDescription>
                    </S.TextContainer>
                </>
            );
        default:
            return (
                <>
                    <S.ErrorIcon src={errorDefault} />;
                    <S.TextContainer>
                        <S.ErrorTitle>Мы сожалеем, но что-то пошло не так</S.ErrorTitle>

                        <S.ErrorDescription>Попробуй выполнить повторный вход.</S.ErrorDescription>
                    </S.TextContainer>
                </>
            );
    }
};

export { ErrorOptionsDisplay };
