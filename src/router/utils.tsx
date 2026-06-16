import React, { useMemo } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';

import { ILocation } from './types';

export const RouteAdapter = ({ children }: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const adaptedHistory = useMemo(
        () => ({
            replace(location: ILocation) {
                navigate(location, { replace: true, state: location.state });
            },
            push(location: ILocation) {
                navigate(location, { replace: false, state: location.state });
            },
        }),
        [navigate],
    );

    return children({ history: adaptedHistory, location });
};

export const withAdminRole = ({
    path,
    element,
    isAdmin,
    isLoading,
}: {
    path: string;
    element: JSX.Element;
    isAdmin: boolean;
    isLoading: boolean;
}) => (isAdmin || isLoading) && <Route path={path} element={isLoading ? undefined : element} />;
