import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Popconfirm, Table, Divider } from 'antd';
import DataForm from '../../components/dataForm';
import { AC_PRIZE_FORMS, REQUEST_TYPE, OPERATION_TYPE } from '../../utils/constant';

class AcPrize extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visiable: false,
            prize: {},
        };
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch({
            type: 'acDetail/getLists',
            payload: { type: REQUEST_TYPE.PRIZE }
        });
    }

    modalTrue(type, pkId) {
        const { prizeLists } = this.props.acDetail;
        let prize = null;
        if (type === OPERATION_TYPE.EDIT) {
            prizeLists.forEach((item) => {
                if (item.pkId === pkId) {
                    prize = item;
                }
            });
        } else if (type === OPERATION_TYPE.ADD) {
            prize = {};
        }

        this.setState({
            visiable: true,
            prize: prize,
        });
    }

    add(values) {
        let dispatchName = 'acDetail/add';
        if (this.state.prize.pkId) {
            dispatchName = 'acDetail/edit';
        }

        this.dispatch({
            type: dispatchName,
            payload: {
                values: values,
                type: REQUEST_TYPE.PRIZE
            }})
            .then(() => {
                this.setState({ visiable: false });
                this.dispatch({
                    type: 'acDetail/getLists',
                    payload: { type: REQUEST_TYPE.PRIZE }
                });
            })
            .catch((e) => { console.log(e); });
    }

    delete(pkId) {
        this.dispatch({
            type: 'acDetail/delete',
            payload: {
                pkId: pkId,
                type: REQUEST_TYPE.PRIZE
            }
        })
            .then(() => {
                this.dispatch({
                    type: 'acDetail/getLists',
                    payload: { type: REQUEST_TYPE.PRIZE }
                });
            })
            .catch((e) => { console.log(e); });
    }

    render() {
        const { prizeLists } = this.props.acDetail;
        const columns = [{
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
            title: '操作',
            dataIndex: 'pkId',
            key: 'pkId',
            render: text => (
                <div>
                    <a onClick={this.modalTrue.bind(this, OPERATION_TYPE.EDIT, text)}>编辑</a><Divider type='vertical' />
                    <Popconfirm title='确认删除此奖项吗？' onConfirm={this.delete.bind(this, text)} okText='Yes' cancelText='No'>
                        <a>删除</a>
                    </Popconfirm>
                </div>
            ),
        }];

        return (
            <div>
                <Button onClick={this.modalTrue.bind(this, OPERATION_TYPE.ADD)} type='primary' style={{ marginBottom: '10px' }}>添加奖项</Button>
                <Modal
                    title='添加奖项'
                    visible={this.state.visiable}
                    onCancel={() => (this.setState({ visiable: false }))}
                    footer={null}
                >
                    <DataForm
                        getFormData={this.add.bind(this)}
                        formItemArrs={AC_PRIZE_FORMS}
                        initValues={this.state.prize}
                    />
                </Modal>
                <Table columns={columns} dataSource={prizeLists} rowKey={list => list.pkId} bordered />
            </div>

        );
    }
}
export default connect(({ acDetail }) => ({ acDetail }))(AcPrize);

