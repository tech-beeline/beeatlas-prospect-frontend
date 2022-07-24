import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

// import { AuthPage, MainPage } from 'pages';
import { MainPage } from 'pages';

import * as C from './const';
import { RouteAdapter } from './utils';

export const NavigationRouter = () => {
    return (
        <Router>
            <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                <Routes>
                    {/* TODO: delete this - mock*/}
                    {/* <Route path={C.TEST_PAGE} element={<TestPage />} /> */}
                    {/* <Route path={C.AUTH_PAGE_PATH} element={<AuthPage />} /> */}
                    <Route path={C.MAIN_PAGE_PATH} element={<MainPage />} />
                </Routes>
            </QueryParamProvider>
        </Router>
    );
};
