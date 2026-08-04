import { useEffect } from 'react';
import { setUserId } from 'features/analytics';

import { useMountEffect } from 'hooks';

import { getAuthProvider } from '../providers';
import { useAuthStore } from '../store';

export const useAuth = () => {
    const { userInfo, setUserInfo, setIsAuthorizing, setIsError } = useAuthStore();

    const authenticate = async () => {
        await getAuthProvider().authenticate({
            setUserInfo,
            setIsAuthorizing,
            setIsError,
        });
    };

    const authenticateCallback = (e: PageTransitionEvent) => {
        if (e.persisted && getAuthProvider().shouldReauthenticateOnPageShow) {
            authenticate();
        }
    };

    useMountEffect(() => {
        authenticate();

        window.addEventListener('pageshow', authenticateCallback);

        return () => window.removeEventListener('pageshow', authenticateCallback);
    });

    useEffect(() => {
        if (userInfo?.email) {
            setUserId(userInfo.email);
        }
    }, [userInfo]);
};
