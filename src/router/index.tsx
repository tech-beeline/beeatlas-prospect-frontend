import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Header } from 'components/core';

import { AppInfoPage, ArchCommPage, DataBasePage, MainPage } from 'pages';
import { Theme } from 'styles';

import * as C from './const';
import { RouteAdapter } from './utils';

export const NavigationRouter = () => {
    return (
        <Theme>
            <Header />

            <Router>
                <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                    <Routes>
                        <Route path={C.MAIN_PAGE_PATH} element={<MainPage />} />

                        <Route path={C.APP_INFO_PAGE_PATH} element={<AppInfoPage />} />

                        <Route path={C.DATA_BASE_PATH} element={<DataBasePage />} />
                        <Route
                            path={`${C.DATA_BASE_PATH}/${C.ARCH_COMM_PATH}`}
                            element={<ArchCommPage />}
                        />
                    </Routes>
                </QueryParamProvider>
            </Router>
        </Theme>
    );
};
