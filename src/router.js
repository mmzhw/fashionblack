import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import LayoutMenu from './components/layout';
import Index from './routes/index';
import Activity from './routes/activity';
import AcDetail from './routes/acdetail';
import AcLists from './routes/aclists';
import Option from './routes/option';

const ROUTERS = [
    {
        key: '/option',
        path: '/option',
        exact: true,
        component: Option,
        icon: 'bulb',
        menuNames: ['关注配置'],
    },
    {
        key: '/activity',
        path: '/activity',
        exact: true,
        component: Activity,
        icon: 'pie-chart',
        menuNames: ['活动列表'],
    },
    {
        key: '/acdetail',
        path: '/acdetail/:activityId',
        exact: true,
        component: AcDetail,
        menuNames: ['活动详情'],
    },
    {
        key: '/acgift',
        path: '/acgift/:activityId',
        exact: true,
        component: AcLists,
        menuNames: ['礼物详情'],
    },
    {
        key: '/acprize',
        path: '/acprize/:activityId',
        exact: true,
        component: AcLists,
        menuNames: ['奖项详情'],
    },
    {
        key: '/acmember',
        path: '/acmember/:activityId',
        exact: true,
        component: AcLists,
        menuNames: ['参赛人员'],
    },

];

const RouterConfig = ({ app, history }) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Index} />
                <Route exact path='/login' component={Index} />
                {ROUTERS.map((route, i) => {
                    return (
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render={(match) => {
                                return (
                                    <LayoutMenu
                                        routes={ ROUTERS }
                                        match={match}
                                        content={route.component}
                                        menuNames={route.menuNames}
                                    />
                                );
                            }}
                        />
                    );
                })}
            </Switch>
        </Router>
    );
};

export default RouterConfig;
