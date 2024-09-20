import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuth, useAuthStore } from 'features/auth';
import { useTheme } from 'features/theme';

import { ErrorBoundary } from 'components/core';
import { AuthorizationStub } from 'components/other';

import { queryClient } from 'api/queries';
import { NavigationRouter } from 'router';
import { GlobalStyles } from 'styles';
import { Snackbar } from 'widgets/Snackbar';

import '@beeline/design-tokens/css/tokens/globals/index.css';
import '@beeline/design-tokens/css/tokens/themes/light.css';
import '@beeline/design-tokens/css/tokens/themes/dark.css';
import '@beeline/design-tokens/css/iconfont/iconfont.css';
import '@beeline/design-tokens/css/font-face.css';

const App = () => {
    const isAuthorizing = useAuthStore((store) => store.isAuthorizing);
    useAuth();
    useTheme();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    {isAuthorizing ? (
                        <AuthorizationStub />
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
