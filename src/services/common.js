import request from '../utils/request';

/* 获取图片鉴权 */
export function getUploadToken(body) {
    return request('/vote-oper-web/qiniu/image/token', body);
}

export function getOption(body) {
    return request('/vote-oper-web/manage/activity/getAttention', body);
}

export function editOption(body) {
    return request('/vote-oper-web/manage/activity/editAttention', body);
}
