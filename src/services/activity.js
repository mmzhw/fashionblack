import request from '../utils/request';

/* 获取活动列表 */
export function getLists(body) {
    return request('/vote-oper-web/manage/activity/list', body);
}

/* 新增活动 */
export function addActivity(body) {
    return request('/vote-oper-web/manage/activity/add', body);
}

/* 新增活动 */
export function delActivity(body) {
    return request('/vote-oper-web/manage/activity/delete', body);
}
