import request from '../utils/request';

/* 登录 */
export function login(body) {
    return request('/vote-oper-web/admin/user/login', body);
}

export function logout(body) {
    return request('/vote-oper-web/admin/user/logout', body);
}

export function register(body) {
    return request('/vote-oper-web/admin/user/add', body);
}
