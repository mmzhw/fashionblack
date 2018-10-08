import request from '../utils/request';

/* 获取礼物列表 */
export function getAcDetail(body) {
    return request('/vote-oper-web/manage/activity/detail', body);
}

/* 获取礼物列表 */
export function getGiftLists(body) {
    return request('/vote-oper-web/manage/gift/list', body);
}

/* 增加礼物 */
export function addGift(body) {
    return request('/vote-oper-web/manage/gift/add', body);
}

/* 删除礼物 */
export function deleteGift(body) {
    return request('/vote-oper-web/manage/gift/delete', body);
}

/* 获取奖项列表 */
export function getPrizeLists(body) {
    return request('/vote-oper-web/manage/prize/list', body);
}

/* 增加奖项 */
export function addPrize(body) {
    return request('/vote-oper-web/manage/prize/add', body);
}

/* 删除奖项 */
export function deletePrize(body) {
    return request('/vote-oper-web/manage/prize/delete', body);
}

/* 获取参赛人员列表 */
export function getMemberLists(body) {
    return request('/vote-oper-web/manage/member/list', body);
}

/* 增加参赛人员 */
export function addMember(body) {
    return request('/vote-oper-web/manage/member/add', body);
}

/* 删除参赛人员 */
export function deleteMember(body) {
    return request('/vote-oper-web/manage/member/delete', body);
}

export function editDetail(body) {
    return request('/vote-oper-web/manage/activity/edit', body);
}
export function editPrize(body) {
    return request('/vote-oper-web/manage/prize/edit', body);
}
export function editGift(body) {
    return request('/vote-oper-web/manage/gift/edit', body);
}
export function editMember(body) {
    return request('/vote-oper-web/manage/member/edit', body);
}
