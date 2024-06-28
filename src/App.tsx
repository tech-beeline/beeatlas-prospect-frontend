import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'features/auth';
import { useTheme } from 'features/theme';

import { ErrorBoundary } from 'components/core';

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
    useAuth();
    useTheme();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    <Router>
                        <NavigationRouter />
                    </Router>
                </ErrorBoundary>
                <Snackbar />
                <GlobalStyles />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};

export default App;
