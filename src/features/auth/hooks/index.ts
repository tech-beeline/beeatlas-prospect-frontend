import { useEffect } from 'react';
import VKITAuth from '@beeline/lk-auth';

import { getPermissionsOfProfile, postSession } from 'api/sessions';
import { useMountEffect } from 'hooks';

import { useAuthStore } from '../store';

const isProd = process.env.NODE_ENV !== 'development';

const auth = new VKITAuth(!isProd ? 'http://localhost:3000' : '');

export const useAuth = () => {
    const {
        accessToken,
        refreshToken,
        isAuth,
        setIsAuth,
        userInfo,
        setUserInfo,
        setTokens,
        code,
        state,
        setCodeAndState,
        // clearStore,
    } = useAuthStore();

    useMountEffect(() => {
        (async () => {
            if (auth.hasNecessaryParams()) {
                const { access_token, refresh_token } = await auth.exchangeCode();

                setCodeAndState(auth.getCodeParam() ?? '', auth.getStateParam() ?? '');

                setTokens(access_token, refresh_token);

                setUserInfo(auth.getClaims(access_token));
            } else {
                // clearStore();
                auth.startAuth();
            }
        })();
    });

    useEffect(() => {
        (async () => {
            if (userInfo && Object.keys(userInfo).length > 0 && isAuth === false) {
                const res = await postSession({
                    login_time: userInfo.iat,
                    // id_profile: 0,
                    // она вернется потом (спросить у бэка)
                    // session: '',
                    atoken: accessToken,
                    rtoken: refreshToken,
                    code: code,
                    state: state,
                    auth_code: '',
                    login: userInfo.winaccountname,
                });

                if (res.status === 200) {
                    await getPermissionsOfProfile(userInfo.winaccountname);

                    setIsAuth(true);
                }
            }
        })();
    }, [userInfo, isAuth]);
};
