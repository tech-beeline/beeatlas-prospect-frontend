import React from 'react';

import { ErrorBoundary } from 'components/core';

import { NavigationRouter } from 'router';
import { StoreProvider } from 'stores/initStore';
import { GlobalStyles } from 'styles';

const App = () => {
    return (
        <>
            <StoreProvider>
                <ErrorBoundary>
                    <NavigationRouter />
                </ErrorBoundary>
            </StoreProvider>

            <GlobalStyles />
        </>
    );
};

export default App;
