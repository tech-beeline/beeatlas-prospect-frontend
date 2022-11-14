import Api from 'utils/api/axiosWrapper';

// import { API_URL } from '../const';

export const getSearchResult = (text: string) => {
    return Api.get({
        url: `/eafdmmart-backend/api/fdm/v1/capabilities/findByText?text=${text}`,
    });
};
