// для вызова API Confluence необходима авторизация, соответственно
// только авторизованным пользователям отображается инфа по заседаниям.

// Вроде можно для авторизации запроса подсунуть при вызове АПИ хедер

// "Authorization" header value: "JWT <jwt-token>"

// https://confluence.veon.com/rest/api/content/132433702?expand=body.storage

import { getStorage } from 'stores/utils';
import Api from 'utils/api/axiosWrapper';

export const getCalendarData = () => {
    const token = getStorage('token');

    return Api.get({
        url: 'https://confluence.veon.com/rest/api/content/132433702?expand=body.storage',
        headers: { Authorization: 'Bearer ' + token },
    });
};
