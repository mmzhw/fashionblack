import {
    getAcDetail, editDetail,
    getGiftLists, addGift, deleteGift, editGift,
    getPrizeLists, addPrize, deletePrize, editPrize,
    getMemberLists, addMember, deleteMember, editMember,
} from '../services/acdetail';
import { REQUEST_TYPE } from '../utils/constant';
import { sortArr } from '../utils/commfun';
import { message } from 'antd';

export default {
    namespace: 'acDetail',
    state: {
        activityId: '',
        type: '',
        detail: {},
        giftLists: [],
        prizeLists: [],
        memberLists: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                let activityId = '';
                let type = '';
                if (location.pathname.match(/acdetail/)) {
                    activityId = location.pathname.replace('/acdetail/', '').replace('/acdetail', '');
                    type = REQUEST_TYPE.DETAIL;
                } else if (location.pathname.match(/acgift/)) {
                    activityId = location.pathname.replace('/acgift/', '').replace('/acgift', '');
                    type = REQUEST_TYPE.GIFT;
                } else if (location.pathname.match(/acprize/)) {
                    activityId = location.pathname.replace('/acprize/', '').replace('/acprize', '');
                    type = REQUEST_TYPE.PRIZE;
                } else if (location.pathname.match(/acmember/)) {
                    activityId = location.pathname.replace('/acmember/', '').replace('/acmember', '');
                    type = REQUEST_TYPE.MEMBER;
                }
                dispatch({ type: 'save', payload: { activityId, type }});
            });
        },
    },
    effects: {
        * getAcDetail({ payload }, { call, put, select }) {
            const state = yield select(({ acDetail }) => acDetail);
            const { activityId } = state;
            const res = yield call(getAcDetail, {
                activityId: activityId,
            });

            if (res.code === 1) {
                yield put({
                    type: 'save', payload: {
                        detail: res.data,
                    }
                });
            } else {
                message.error(res.msg);
            }
        },
        * getLists({ payload }, { call, put, select }) {
            const state = yield select(({ acDetail }) => acDetail);
            const { activityId, type } = state;
            let res = {};
            if (type === REQUEST_TYPE.GIFT) {
                res = yield call(getGiftLists, { activityId });
                if (res.code === 1) {
                    yield put({
                        type: 'save', payload: {
                            giftLists: sortArr(res.data.rows || [], 'sortd'),
                        }
                    });
                } else {
                    message.error(res.msg);
                }
            } else if (type === REQUEST_TYPE.PRIZE) {
                res = yield call(getPrizeLists, { activityId });
                if (res.code === 1) {
                    yield put({
                        type: 'save', payload: {
                            prizeLists: sortArr(res.data || [], 'sortd'),
                        }
                    });
                } else {
                    message.error(res.msg);
                }
            } else if (type === REQUEST_TYPE.MEMBER) {
                res = yield call(getMemberLists, { activityId });
                if (res.code === 1) {
                    yield put({
                        type: 'save', payload: {
                            memberLists: res.data.rows,
                        }
                    });
                } else {
                    message.error(res.msg);
                }
            }
        },
        * add({ payload }, { call, put, select }) {
            const state = yield select(({ acDetail }) => acDetail);
            const { activityId, type } = state;
            const { values } = payload || {};
            let res = {};
            if (type === REQUEST_TYPE.GIFT) {
                res = yield call(addGift, { activityId, ...values });
            } else if (type === REQUEST_TYPE.PRIZE) {
                res = yield call(addPrize, { activityId, ...values });
            } else if (type === REQUEST_TYPE.MEMBER) {
                res = yield call(addMember, { activityId, ...values });
            }

            if (res.code === 1) {
                message.success('添加成功');
            } else {
                message.error(res.msg);
            }
        },
        * delete({ payload }, { call, put, select }) {
            const state = yield select(({ acDetail }) => acDetail);
            const { activityId, type } = state;
            const { pkId } = payload || {};
            let res = {};
            if (type === REQUEST_TYPE.GIFT) {
                res = yield call(deleteGift, { activityId, giftId: pkId });
            } else if (type === REQUEST_TYPE.PRIZE) {
                res = yield call(deletePrize, { activityId, prizeId: pkId });
            } else if (type === REQUEST_TYPE.MEMBER) {
                res = yield call(deleteMember, { activityId, memberId: pkId });
            }

            if (res.code === 1) {
                message.success('删除成功');
            } else {
                message.error(res.msg);
            }
        },
        * edit({ payload }, { call, put, select }) {
            const state = yield select(({ acDetail }) => acDetail);
            const { activityId, type } = state;
            const { values } = payload || {};
            let res = {};
            if (type === REQUEST_TYPE.GIFT) {
                res = yield call(editGift, {
                    activityId: activityId,
                    ...values
                });
            } else if (type === REQUEST_TYPE.PRIZE) {
                res = yield call(editPrize, {
                    activityId: activityId,
                    ...values
                });
            } else if (type === REQUEST_TYPE.MEMBER) {
                res = yield call(editMember, {
                    activityId: activityId,
                    ...values
                });
            } else if (type === REQUEST_TYPE.DETAIL) {
                res = yield call(editDetail, {
                    activityId: activityId,
                    ...values
                });
            }
            if (res.code === 1) {
                message.success('保存成功');
            } else {
                message.error(res.msg);
            }
        },

    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
