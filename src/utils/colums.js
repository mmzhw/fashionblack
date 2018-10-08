import { OPERATION_TYPE, MEMBER_TYPE, DATA_FORMAT } from './constant';
import { handleIMG } from './commfun';
import { Popconfirm, Divider } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const getACColums = (deleteActivity, checkVisit) => {
    return [{
        title: '封面',
        width: '8%',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: text => <img alt={''} width={100} src={handleIMG(text)} style={{ border: '1px solid #e8e8e8' }}/>,
    }, {
        title: '活动ID',
        width: '18%',
        dataIndex: 'pkId',
        key: 'pkId',
        render: text => <span>{text}</span>,
    }, {
        title: '活动名称',
        width: '8%',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
    }, {
        title: '活动位置',
        width: '8%',
        dataIndex: 'location',
        key: 'location',
        render: text => <span>{text}</span>,
    }, {
        title: '主办单位',
        width: '8%',
        dataIndex: 'firstOrganizer',
        key: 'firstOrganizer',
        render: text => <span>{text}</span>,
    }, {
        title: '开始时间',
        width: '10%',
        dataIndex: 'startDate',
        key: 'startDate',
        render: text => <span>{moment(text).format(DATA_FORMAT)}</span>,
    }, {
        title: '结束时间',
        width: '10%',
        dataIndex: 'endDate',
        key: 'endDate',
        render: text => <span>{moment(text).format(DATA_FORMAT)}</span>,
    }, {
        title: '操作',
        width: '30%',
        dataIndex: 'id',
        key: 'id',
        render: (text, item) => (
            <div>
                <a onClick={() => { checkVisit(item); }}>生成活动地址</a><Divider type='vertical' />
                <Link to={{ pathname: `/acdetail/${item.pkId}` }} >活动详情</Link><Divider type='vertical' />
                <Link to={{ pathname: `/acgift/${item.pkId}` }} >礼物详情</Link><Divider type='vertical' />
                <Link to={{ pathname: `/acprize/${item.pkId}` }} >奖项详情</Link><Divider type='vertical' />
                <Link to={{ pathname: `/acmember/${item.pkId}` }} >参赛人员</Link><Divider type='vertical' />
                <Popconfirm title='确认删除此活动吗？' onConfirm={() => { deleteActivity(item.pkId); }} okText='Yes' cancelText='No'>
                    <a>删除</a>
                </Popconfirm>
            </div>
        ),
    }];
};

export const getMemberColums = (modalTrue, del) => {
    return [{
        title: '头像',
        dataIndex: 'avator',
        key: 'avator',
        render: text => <img alt={''} width={50} src={handleIMG(text)} style={{ border: '1px solid #e8e8e8' }}/>,
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
    }, {
        title: '编号',
        dataIndex: 'memberNumber',
        key: 'memberNumber',
        render: text => <span>{text}</span>,
    }, {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        render: text => <span>{text}</span>,
    }, {
        title: '微信号',
        dataIndex: 'weixin',
        key: 'weixin',
        render: text => <span>{text}</span>,
    }, {
        title: '介绍',
        dataIndex: 'detail',
        key: 'detail',
        render: text => <span>{text}</span>,
    }, {
        title: '选手类型',
        dataIndex: 'type',
        key: 'type',
        render: text => <span>{MEMBER_TYPE[text]}</span>,
    }, {
        title: '操作',
        dataIndex: 'pkId',
        key: 'pkId',
        render: text => (
            <div>
                <a onClick={() => {
                    modalTrue(OPERATION_TYPE.EDIT, text);
                }}>编辑</a><Divider type='vertical'/>
                <Popconfirm title='确认删除此参赛人员吗？' onConfirm={() => {
                    del(text);
                }} okText='Yes' cancelText='No'>
                    <a>删除</a>
                </Popconfirm>
            </div>
        ),
    }];
};

export const getPrizeColums = (modalTrue, del) => {
    return [{
        title: '奖项名',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
    }, {
        title: '奖项详情',
        dataIndex: 'detail',
        key: 'detail',
        render: text => <span>{text}</span>,
    }, {
        title: '排序（数字大者在上）',
        dataIndex: 'sortd',
        key: 'sortd',
        render: text => <span>{text}</span>,
    }, {
        title: '操作',
        dataIndex: 'pkId',
        key: 'pkId',
        render: text => (
            <div>
                <a onClick={ () => { modalTrue(OPERATION_TYPE.EDIT, text); } }>编辑</a><Divider type='vertical' />
                <Popconfirm title='确认删除此奖项吗？' onConfirm={() => { del(text); } } okText='Yes' cancelText='No'>
                    <a>删除</a>
                </Popconfirm>
            </div>
        ),
    }];
};

export const getGiftColums = (modalTrue, del) => {
    return [{
        title: '图标',
        dataIndex: 'iconUrl',
        key: 'iconUrl',
        render: text => <img alt={''} width={50} src={handleIMG(text)} style={{ border: '1px solid #e8e8e8' }}/>,
    }, {
        title: '礼物名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
    }, {
        title: '礼物价格',
        dataIndex: 'price',
        key: 'price',
        render: text => <span>{text}</span>,
    }, {
        title: '价值票数',
        dataIndex: 'voteNumber',
        key: 'voteNumber',
        render: text => <span>{text}</span>,
    }, {
        title: '排序（数字大者在上）',
        dataIndex: 'sortd',
        key: 'sortd',
        render: text => <span>{text}</span>,
    }, {
        title: '操作',
        dataIndex: 'pkId',
        key: 'pkId',
        render: text => (
            <div>
                <a onClick={ () => { modalTrue(OPERATION_TYPE.EDIT, text); } }>编辑</a><Divider type='vertical' />
                <Popconfirm title='确认删除此礼物吗？' onConfirm={() => { del(text); } } okText='Yes' cancelText='No'>
                    <a>删除</a>
                </Popconfirm>
            </div>
        ),
    }];
};
