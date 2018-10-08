import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Popconfirm, Table, Divider } from 'antd';
import DataForm from '../../components/dataForm';
import { AC_MEMBER_FORMS, REQUEST_TYPE, OPERATION_TYPE } from '../../utils/constant';
import { handleIMG } from '../../utils/commfun';

class AcMember extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visiable: false,
            member: {},
        };
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch({
            type: 'acDetail/getLists',
            payload: { type: REQUEST_TYPE.MEMBER }
        });
    }

    modalTrue(type, pkId) {
        const { memberLists } = this.props.acDetail;
        let member = {};
        if (type === OPERATION_TYPE.EDIT) {
            memberLists.forEach((item) => {
                if (item.pkId === pkId) {
                    member = item;
                }
            });
        } else if (type === OPERATION_TYPE.ADD) {
            member = {};
        }

        this.setState({
            visiable: true,
            member: member,
        });
    }

    add(values) {
        let dispatchName = 'acDetail/add';
        if (this.state.member.pkId) {
            dispatchName = 'acDetail/edit';
        }

        this.dispatch({
            type: dispatchName,
            payload: {
                values: values,
                type: REQUEST_TYPE.MEMBER
            }})
            .then(() => {
                this.setState({ visiable: false });
                this.dispatch({
                    type: 'acDetail/getLists',
                    payload: { type: REQUEST_TYPE.MEMBER }
                });
            })
            .catch((e) => { console.log(e); });
    }

    delete(pkId) {
        this.dispatch({
            type: 'acDetail/delete',
            payload: {
                pkId: pkId,
                type: REQUEST_TYPE.MEMBER
            }
        })
            .then(() => {
                this.dispatch({
                    type: 'acDetail/getLists',
                    payload: { type: REQUEST_TYPE.MEMBER }
                });
            })
            .catch((e) => { console.log(e); });
    }

    render() {
        const { memberLists } = this.props.acDetail;
        const columns = [{
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
            title: '操作',
            dataIndex: 'pkId',
            key: 'pkId',
            render: text => (
                <div>
                    <a onClick={this.modalTrue.bind(this, OPERATION_TYPE.EDIT, text)}>编辑</a><Divider type='vertical' />
                    <Popconfirm title='确认删除此参赛人员吗？' onConfirm={this.delete.bind(this, text)} okText='Yes' cancelText='No'>
                        <a>删除</a>
                    </Popconfirm>
                </div>
            ),
        }];

        return (
            <div>
                <Button onClick={this.modalTrue.bind(this, OPERATION_TYPE.ADD)} type='primary' style={{ marginBottom: '10px' }}>添加参赛人员</Button>
                <Modal
                    title='添加参赛人员'
                    visible={this.state.visiable}
                    onCancel={() => (this.setState({ visiable: false }))}
                    footer={null}
                >
                    <DataForm
                        getFormData={this.add.bind(this)}
                        formItemArrs={AC_MEMBER_FORMS}
                        initValues={this.state.member}
                    />
                </Modal>
                <Table columns={columns} dataSource={memberLists} rowKey={list => list.pkId} bordered />
            </div>

        );
    }
}
export default connect(({ acDetail }) => ({ acDetail }))(AcMember);

