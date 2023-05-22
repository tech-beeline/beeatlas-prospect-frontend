import { API_URL } from 'api/const';
import Api from 'utils/api/axiosWrapper';

import * as T from './types';

export const postSession = (data: T.ISessionData) => {
    return Api.post({
        url: `${API_URL}admin/v1/sessions`,
        data,
    });
};
