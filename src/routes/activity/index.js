import React from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, notification } from 'antd';
import { getACColums } from '../../utils/colums';
import DataForm from '../../components/dataForm';
import { AC_DETAIL_FORMS } from '../../utils/constant';
import { VISIT_URL } from '../../utils/config';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';

class Activity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visiable: false,
        };
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch({
            type: 'activity/getLists'
        });
    }

    addActivity(values) {
        this.dispatch({ type: 'activity/addActivity', payload: { values: values }})
            .then(() => {
                this.setState({ visiable: false });
                this.dispatch({
                    type: 'activity/getLists'
                });
            })
            .catch((e) => { console.log(e); });
    }

    modalTrue() {
        this.setState({ visiable: true });
    }

    deleteActivity(activityId) {
        this.dispatch({ type: 'activity/delActivity', payload: { activityId: activityId }})
            .then(() => {
                this.dispatch({
                    type: 'activity/getLists'
                });
            })
            .catch((e) => { console.log(e); });
    }

    checkVisit(item) {
        console.log(item);
        const key = `open${Date.now()}`;
        let visitUrl = VISIT_URL + item.pkId;
        let visitWX = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9bd96b4b7a025431&redirect_uri=' + visitUrl + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
        notification.info({
            message: `${item.name} 活动（只支持微信中访问）`,
            description: (
                <div>
                    <span style={{ color: 'blue' }}>点击二维码可复制链接</span><br />
                    <QRCode style={{ cursor: ' pointer' }} onClick={() => (copy(visitWX))} value={visitWX} />
                </div>
            ),
            placement: 'bottomLeft',
            duration: 10,
            key,
        });
    }

    render() {
        const { lists } = this.props.activity;
        const columns = getACColums(this.deleteActivity.bind(this), this.checkVisit.bind(this));

        return (
            <div>
                <Button onClick={this.modalTrue.bind(this)} type='primary' style={{ marginBottom: '10px' }}>新建活动</Button>
                <Modal
                    title='添加活动'
                    width={'70vw'}
                    visible={this.state.visiable}
                    onCancel={() => (this.setState({ visiable: false }))}
                    footer={null}
                >
                    <DataForm
                        getFormData={this.addActivity.bind(this)}
                        formItemArrs={AC_DETAIL_FORMS}
                    />
                </Modal>
                <Table columns={columns} dataSource={lists} rowKey={list => list.id} bordered />
            </div>

        );
    }
}
export default connect(({ activity }) => ({ activity }))(Activity);

