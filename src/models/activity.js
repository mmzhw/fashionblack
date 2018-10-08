import { getLists, addActivity, delActivity } from '../services/activity';
import { message } from 'antd';
export default {
    namespace: 'activity',
    state: {
        lists: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            // history.listen(location => {
            //     let activityId = location.pathname.replace('/acdetail/', '').replace('/acdetail', '');
            //     dispatch({ type: 'save', payload: { activityId }});
            // });
        },
    },
    effects: {
        * getLists({ payload }, { call, put, select }) {
            const res = yield call(getLists, {
                pager: {
                    page: 1,
                    rows: 99,
                },
            });

            if (res.code === 1) {
                yield put({
                    type: 'save', payload: {
                        lists: res.data.rows,
                    }
                });
            } else {
                message.error(res.msg);
            }
        },
        * addActivity({ payload }, { call, put, select }) {
            const { values } = payload || {};
            const res = yield call(addActivity, { ...values });
            if (res.code === 1) {
                message.success('成功添加活动！');
            } else {
                message.error(res.msg);
            }
        },
        * delActivity({ payload }, { call, put, select }) {
            const { activityId } = payload || {};
            const res = yield call(delActivity, { activityId });
            if (res.code === 1) {
                message.success('成功删除活动！');
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
