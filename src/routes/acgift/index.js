import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Popconfirm, Table, Divider } from 'antd';
import DataForm from '../../components/dataForm';
import { AC_GIFT_FORMS, REQUEST_TYPE, OPERATION_TYPE } from '../../utils/constant';
import { handleIMG } from '../../utils/commfun';

class AcGift extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visiable: false,
            gift: {},
        };
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch({
            type: 'acDetail/getLists',
            payload: { type: REQUEST_TYPE.GIFT }
        });
    }

    modalTrue(type, pkId) {
        const { giftLists } = this.props.acDetail;
        let gift = null;
        if (type === OPERATION_TYPE.EDIT) {
            giftLists.forEach((item) => {
                if (item.pkId === pkId) {
                    gift = item;
                }
            });
        } else if (type === OPERATION_TYPE.ADD) {
            gift = {};
        }

        this.setState({
            visiable: true,
            gift: gift,
        });
    }

    add(values) {
        let dispatchName = 'acDetail/add';
        if (this.state.gift.pkId) {
            dispatchName = 'acDetail/edit';
        }

        this.dispatch({
            type: dispatchName,
            payload: {
                values: values,
                type: REQUEST_TYPE.GIFT
            }})
            .then(() => {
                this.setState({ visiable: false });
                this.dispatch({
                    type: 'acDetail/getLists',
                    payload: { type: REQUEST_TYPE.GIFT }
                });
            })
            .catch((e) => { console.log(e); });
    }

    delete(pkId) {
        this.dispatch({
            type: 'acDetail/delete',
            payload: {
                pkId: pkId,
                type: REQUEST_TYPE.GIFT
            }
        })
            .then(() => {
                this.dispatch({
                    type: 'acDetail/getLists',
                    payload: { type: REQUEST_TYPE.GIFT }
                });
            })
            .catch((e) => { console.log(e); });
    }

    render() {
        const { giftLists } = this.props.acDetail;
        const columns = [{
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
            title: '操作',
            dataIndex: 'pkId',
            key: 'pkId',
            render: text => (
                <div>
                    <a onClick={this.modalTrue.bind(this, OPERATION_TYPE.EDIT, text)}>编辑</a><Divider type='vertical' />
                    <Popconfirm title='确认删除此礼物吗？' onConfirm={this.delete.bind(this, text)} okText='Yes' cancelText='No'>
                        <a>删除</a>
                    </Popconfirm>
                </div>
            ),
        }];

        return (
            <div>
                <Button onClick={this.modalTrue.bind(this, OPERATION_TYPE.ADD)} type='primary' style={{ marginBottom: '10px' }}>添加礼物</Button>
                <Modal
                    title='添加礼物'
                    visible={this.state.visiable}
                    onCancel={() => (this.setState({ visiable: false }))}
                    footer={null}
                >
                    <DataForm
                        getFormData={this.add.bind(this)}
                        formItemArrs={AC_GIFT_FORMS}
                        initValues={this.state.gift}
                    />
                </Modal>
                <Table columns={columns} dataSource={giftLists} rowKey={list => list.pkId} bordered />
            </div>

        );
    }
}
export default connect(({ acDetail }) => ({ acDetail }))(AcGift);

