import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Table } from 'antd';
import DataForm from '../../components/dataForm';
import { AC_GIFT_FORMS, AC_PRIZE_FORMS, AC_MEMBER_FORMS, REQUEST_TYPE, OPERATION_TYPE } from '../../utils/constant';
import { getMemberColums, getGiftColums, getPrizeColums } from '../../utils/colums';

class AcLists extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visiable: false,
            single: {},
        };
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch({
            type: 'acDetail/getLists',
        });
    }

    modalTrue(operationType, pkId) {
        const { type } = this.props.acDetail;
        let lists = [];
        if (type === REQUEST_TYPE.MEMBER) {
            lists = this.props.acDetail.memberLists;
        } else if (type === REQUEST_TYPE.PRIZE) {
            lists = this.props.acDetail.prizeLists;
        } else if (type === REQUEST_TYPE.GIFT) {
            lists = this.props.acDetail.giftLists;
        }

        let single = null;
        if (operationType === OPERATION_TYPE.EDIT) {
            lists.forEach((item) => {
                if (item.pkId === pkId) {
                    single = item;
                }
            });
        } else if (operationType === OPERATION_TYPE.ADD) {
            single = {};
        }

        this.setState({
            visiable: true,
            single: single,
        });
    }

    add(values) {
        let dispatchName = 'acDetail/add';
        if (this.state.single.pkId) {
            dispatchName = 'acDetail/edit';
            values.pkId = this.state.single.pkId;
        }

        this.dispatch({
            type: dispatchName,
            payload: { values: values }
        })
            .then(() => {
                this.setState({ visiable: false });
                this.dispatch({ type: 'acDetail/getLists' });
            })
            .catch((e) => { console.log(e); });
    }

    delete(pkId) {
        this.dispatch({
            type: 'acDetail/delete',
            payload: { pkId: pkId }
        })
            .then(() => {
                this.dispatch({ type: 'acDetail/getLists' });
            })
            .catch((e) => { console.log(e); });
    }

    render() {
        const { type } = this.props.acDetail;
        let lists = [];
        let formItemArrs = [];
        let columns = [];
        if (type === REQUEST_TYPE.MEMBER) {
            lists = this.props.acDetail.memberLists;
            formItemArrs = AC_MEMBER_FORMS;
            columns = getMemberColums(this.modalTrue.bind(this), this.delete.bind(this));
        } else if (type === REQUEST_TYPE.PRIZE) {
            lists = this.props.acDetail.prizeLists;
            formItemArrs = AC_PRIZE_FORMS;
            columns = getPrizeColums(this.modalTrue.bind(this), this.delete.bind(this));
        } else if (type === REQUEST_TYPE.GIFT) {
            lists = this.props.acDetail.giftLists;
            formItemArrs = AC_GIFT_FORMS;
            columns = getGiftColums(this.modalTrue.bind(this), this.delete.bind(this));
        }

        return (
            <div>
                <Button onClick={this.modalTrue.bind(this, OPERATION_TYPE.ADD)} type='primary' style={{ marginBottom: '10px' }}>添加</Button>
                <Modal
                    title='添加'
                    visible={this.state.visiable}
                    onCancel={() => (this.setState({ visiable: false }))}
                    footer={null}
                >
                    <DataForm
                        getFormData={this.add.bind(this)}
                        formItemArrs={formItemArrs}
                        initValues={this.state.single}
                    />
                </Modal>
                <Table columns={columns} dataSource={lists} rowKey={list => list.pkId} bordered />
            </div>

        );
    }
}
export default connect(({ acDetail }) => ({ acDetail }))(AcLists);

