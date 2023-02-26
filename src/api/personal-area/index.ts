import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

export const getRoles = () => {
    return Api.get({
        url: `${API_URL}admin/v1/roles`,
    });
};

// export const getGeneralItems = () => {
//     return Api.get({
//         url: `${API_URL}fdm/v1/groups`,
//     });
// };

// export const getItemChildren = (id: number) => {
//     return Api.get({
//         url: `${API_URL}fdm/v1/capabilities/findByDomain?id=${id}`,
//     });
// };
