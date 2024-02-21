import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

export const getTechRadar = () => {
    return Api.get({
        url: `${API_URL}techradar/v1/tech`,
    });
};
