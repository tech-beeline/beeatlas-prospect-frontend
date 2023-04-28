import Api from 'utils/api/axiosWrapper';

import { API_URL } from '../const';

import * as T from './types';

// получение списка всех ролей
export const getRoles = () => {
    return Api.get({
        url: `${API_URL}admin/v1/roles`,
    });
};

// id: number;
// name: string;
// alias: string;
// descr: string;
// deleted: boolean;

// --------------------------

// создание роли
export const postRole = (data: T.IRole) => {
    return Api.post({
        url: `${API_URL}admin/v1/roles`,
        data,
    });
};

// id: number;

// --------------------------

// изменение роли
// отправляем id и поля которые хотим изменить, обязательное поле только id
export const putRole = (data: T.IRole) => {
    return Api.put({
        url: `${API_URL}admin/v1/roles`,
        data,
    });
};

// вернет 200 или 403

// --------------------------

// получение конкретной роли
export const getCurrentRole = (id: number) => {
    return Api.get({
        url: `${API_URL}admin/v1/roles/${id}`,
    });
};

// id: number;
// name: string;
// alias: string;
// descr: string;
// deleted: boolean;

// --------------------------

// удаление роли
export const deleteRole = (id: number) => {
    return Api.delete({
        url: `${API_URL}admin/v1/roles/${id}`,
    });
};

// --------------------------

// получить доступы у конкретной роли
export const getRolePermission = (id: number) => {
    return Api.delete({
        url: `${API_URL}admin/v1/roles/${id}/permissions`,
    });
};

// [
//  {
//      id: number;
//      name: string;
//      alias: string;
//      descr: string;
//      deleted: boolean;
//  }
// ]

// --------------------------

// сохранить/обновить доступы у конкретной роли
export const putRolePermission = (id: number) => {
    return Api.put({
        url: `${API_URL}admin/v1/roles/${id}/permissions`,
    });
};

// здесь вопросы, что отправляем, что меняем?
// здесь лучше ключ значение булево + текст на русском
// [
//     {
//         alias: string;
//     }
// ]
