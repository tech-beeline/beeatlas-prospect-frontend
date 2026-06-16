import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAuth, useAuthStore } from 'features/auth';
import { useTheme } from 'features/theme';

import { ErrorBoundary } from 'components/core';
import { AuthorizationErrorStub, AuthorizationStub } from 'components/other';

import { queryClient } from 'api/queries';
import { NavigationRouter } from 'router';
import { GlobalStyles } from 'styles';
import { Snackbar } from 'widgets/Snackbar';

import 'styles/design-tokens/css/tokens/globals/index.css';
import 'styles/design-tokens/css/tokens/themes/light.css';
import 'styles/design-tokens/css/tokens/themes/dark.css';
import 'styles/design-tokens/css/iconfont/iconfont.css';
import 'styles/design-tokens/css/font-face.css';

dayjs.extend(utc);

const App = () => {
    const [isAuthorizing, isError] = useAuthStore((store) => [store.isAuthorizing, store.isError]);
    useAuth();
    useTheme();

    console.log(window.FEATURE_FLAGS);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    {isAuthorizing ? (
                        <AuthorizationStub />
                    ) : isError ? (
                        <AuthorizationErrorStub />
                    ) : (
                        <Router>
                            <NavigationRouter />
                        </Router>
                    )}
                </ErrorBoundary>
                <Snackbar />
                <GlobalStyles />
                <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};

export default App;
