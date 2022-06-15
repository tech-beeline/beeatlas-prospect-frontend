import React, { FormEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';

import { Modal } from 'components/containers';
import { Logo } from 'components/core';
import { Button, Input, OuterLink, TextButton } from 'components/interaction';
import { ProgressBar, Title } from 'components/other';

import { useMountEffect, useTimer } from 'hooks';
import { useRootStore } from 'stores/initStore';
import { persistCookie } from 'stores/utils';

import * as SPage from '../units';

import ArrowInButtonSVG from './images/arrow-in-button.svg';

// TODO: mock
import mockResponseOfferJSON from './mocks/mock-file-response.json';
import mockResponseAfterRedirectJSON from './mocks/mock-response.json';
import { ErrorDisplay, ErrorOptionsDisplay } from './ErrorDisplay';
import * as T from './types';
import * as S from './units';

// TODO: refactor
export const AuthPage = observer(() => {
    const {
        authStore: { auth, authCheck, isLoadingAuth },
    } = useRootStore();

    const [, setId] = useQueryParam('id', NumberParam);
    // TODO: reffer first
    const [, setReffer] = useQueryParam('reffer', StringParam);
    const [serviceName, setServiceName] = useQueryParam('service_name', StringParam);

    const [isVisibleModal, setVisibleModal] = useState(false);
    const [offerDocument, setOfferDocument] = useState('');

    const [phone, setPhone] = useState('');
    const [time, setTime] = useState(59);
    // Для дизейбла кнопки при input onChange
    const [isValid, setValid] = useState(true);

    const [optionDisplay, setOptionDisplay] = useState('');

    // TODO: custom method for set query params from json
    useMountEffect(() => {
        const { id, reffer, service_name } = mockResponseAfterRedirectJSON;

        const { service_id, file } = mockResponseOfferJSON;

        if (service_id === id) {
            (async () => {
                // Интересный факт: если указать только file (где будет точный путь с mocks) - будет ошибка
                // https://github.com/webpack/webpack/issues/6680

                const res = await import(`./mocks/${file}`);

                setOfferDocument(res.default);
            })();
        }

        setId(id);
        setReffer(reffer);
        setServiceName(service_name);
    });

    useTimer(time, setTime, optionDisplay === T.OptionsDisplay.MobileId, true);

    const displayOptionsHandler = async (option: T.OptionsDisplay | '') => {
        setOptionDisplay(option);
    };
    const phoneFormat = (phone: string) => {
        return phone.replace(/[^0-9]/g, '');
    };
    const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = (await auth(phoneFormat(phone))) as any;

        if (res.data) {
            setTime(res.data.expires_in);

            displayOptionsHandler(T.OptionsDisplay.MobileId);

            const intervalId = setInterval(async () => {
                const checkResult = await authCheck(res.data.auth_req_id);

                if (checkResult.data.access_token) {
                    console.log(checkResult.data);

                    persistCookie('pro_auth_token', checkResult.data.access_token);
                    persistCookie('pro_auth_refresh', checkResult.data.refresh_token);
                    // persistCookie('expires_in', checkResult.data.expires_in);
                    // persistCookie('refresh_expires_in', checkResult.data.refresh_expires_in);
                    clearInterval(intervalId);
                    window.open('your current page URL', '_self', '');
                    window.close();
                    // TODO: redirect - history.push
                    // если нужен третий шаг формы
                    // displayOptionsHandler(T.OptionsDisplay.ConfirmEnter);
                }
            }, 5000);
        }
        // TODO: else - catch (optionsError)
    };

    // TODO: mock

    // const handleAcceptEnter = () => {
    //     const navigate = useNavigate();

    //     navigate('/');
    //     // TODO: why its not work? reffer = "/"
    //     // navigate(reffer);
    // };

    return (
        <SPage.PageWrapper>
            <S.AuthPageWrapper>
                <Logo height={45} />

                <S.IconButtonStyled
                    icon={ArrowInButtonSVG}
                    onClick={() => {
                        displayOptionsHandler('');
                        window.close();
                        // TODO: добавить reject
                    }}
                />

                <S.PaperStyled>
                    <Title>Вход</Title>

                    {optionDisplay === T.OptionsDisplay.MobileId ? (
                        <S.MobileIdContainer>
                            <S.PhoneTimeContainer>
                                <span>{phone}</span>
                                <span>{time} сек</span>
                            </S.PhoneTimeContainer>

                            <ProgressBar currentProgress={time} maxProgress={60} />

                            <p>
                                На экране твоего телефона отобразится запрос на подтверждение входа
                                или придёт SMS
                            </p>
                        </S.MobileIdContainer>
                    ) : optionDisplay === T.OptionsDisplay.ConfirmEnter ? (
                        // TODO: Вынести в отд компонент и добавить form - ?
                        <>
                            <p>
                                При входе на ресурс ты принимаешь{' '}
                                <TextButton onClick={() => setVisibleModal(true)}>
                                    условия доступа
                                </TextButton>
                            </p>

                            <a className="button" href="http://localhost:3000/">
                                Подтвердить
                            </a>
                        </>
                    ) : Object.values(ErrorOptionsDisplay as any).includes(optionDisplay) ? (
                        <ErrorDisplay error={optionDisplay} />
                    ) : (
                        <S.AuthForm onSubmit={onSubmitForm}>
                            <Input
                                value={phone}
                                onChange={setPhone}
                                type="phone"
                                label="Введи номер телефона любого оператора"
                                placeholder="+7 000 000-00-00"
                                {...{ isValid, setValid }}
                            />

                            <Button disabled={!isValid || isLoadingAuth} isLoading={isLoadingAuth}>
                                Отправить
                            </Button>
                        </S.AuthForm>
                    )}
                </S.PaperStyled>

                {!optionDisplay && <S.SimpleText>Ты входишь в {serviceName}</S.SimpleText>}
            </S.AuthPageWrapper>

            <S.FooterBlock>
                При входе на ресурс ты принимаешь{' '}
                <TextButton onClick={() => setVisibleModal(true)}>условия доступа</TextButton>,{' '}
                <OuterLink path="https://google.com">оферту сервиса</OuterLink> и{' '}
                <OuterLink path="https://google.com">услуги</OuterLink>
            </S.FooterBlock>

            <Modal isVisible={isVisibleModal} setVisible={setVisibleModal} isHTML>
                {offerDocument}
            </Modal>
        </SPage.PageWrapper>
    );
});
