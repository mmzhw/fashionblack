import { getOption, editOption } from '../services/common';
import { message } from 'antd/lib/index';

export default {
    namespace: 'option',
    state: {
        attention: ''
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {

            });
        },
    },
    effects: {
        * getOption({ payload }, { call, put, select }) {
            const res = yield call(getOption, {});
            if (res.code === 1) {
                yield put({
                    type: 'save', payload: {
                        attention: res.data.attention,
                    }
                });
            } else {
                message.error(res.msg);
            }
        },
        * editOption({ payload }, { call, put, select }) {
            const { values } = payload || {};
            const res = yield call(editOption, {
                ...values
            });
            if (res.code === 1) {
                message.success('保存成功');
                yield put({ type: 'getOption' });
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
