import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

export const getAppInfo = () => {
    return Api.get({
        url: `${API_URL}runtime/v1/parameters`,
    });
};
