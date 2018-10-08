import { login, logout, register } from '../services/index';
import { message } from 'antd';
import storage from '../utils/storage';
import { STORAGE } from '../utils/constant';

export default {
    namespace: 'index',
    state: {},
    subscriptions: {
        setup({ dispatch, history }) {
            // history.listen(location => {
            //     let activityId = location.pathname.replace('/activity/', '').replace('/activity', '');
            //     dispatch({ type: 'save', payload: { activityId }});
            // });
        },
    },
    effects: {
        * login({ payload }, { call, put, select }) {
            const { username, password, history } = payload || {};
            const res = yield call(login, {
                username: username,
                password: password,
            });
            if (res.code === 1) {
                message.success('登录成功！');
                storage.set(STORAGE.TOKEN, res.data.token);
                history.push('/activity');
            } else {
                message.error(res.msg);
            }
        },
        * logout({ payload }, { call, put, select }) {
            const res = yield call(logout, {});
            storage.remove(STORAGE.TOKEN);
            if (res.code === 1) {
                message.success('登出成功！');
            } else {
                message.error(res.msg);
            }
        },
        * register({ payload }, { call, put, select }) {
            const { username, password } = payload || {};
            let res = {};
            res = yield call(register, {
                username: username,
                password: password,
            });
            console.log(res);
        },
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
