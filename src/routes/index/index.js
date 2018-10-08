import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.less';
import { OPERATION_TYPE } from '../../utils/constant';

const FormItem = Form.Item;

class IndexForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            type: OPERATION_TYPE.LOGIN
        };
        this.dispatch = this.props.dispatch;
    }

  handleSubmit = (e) => {
      e.preventDefault();
      let self = this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
              let dispatchType = 'index/login';
              if (self.state.type === OPERATION_TYPE.REGISTER) {
                  dispatchType = 'index/register';
              }
              self.dispatch({
                  type: dispatchType,
                  payload: {
                      username: values.userName,
                      password: values.password,
                      history: self.props.history,
                  }
              });
          }
      });
  }

  render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div className={styles['wrapper']}>
              <div className={styles['loginWrapper']}>
                  <h1>{this.state.type === OPERATION_TYPE.REGISTER ? '注册' : '投票管理系统'}</h1>
                  <Form onSubmit={this.handleSubmit} >
                      <FormItem>
                          {getFieldDecorator('userName', {
                              rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                              <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
                          )}
                      </FormItem>
                      <FormItem>
                          {getFieldDecorator('password', {
                              rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                              <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
                          )}
                      </FormItem>
                      {/* <div className={styles['typeWrapper']}>*/}
                      {/* <a onClick={() => { this.setState({ type: OPERATION_TYPE.LOGIN }); }}>登录</a>*/}
                      {/* <Divider type='vertical'/>*/}
                      {/* <a onClick={() => { this.setState({ type: OPERATION_TYPE.REGISTER }); }}>注册</a>*/}
                      {/* </div>*/}
                      <FormItem>
                          <Button type='primary' htmlType='submit' block>登录</Button>
                      </FormItem>
                  </Form>
              </div>
          </div>

      );
  }
}

const Index = Form.create()(IndexForm);

export default connect(({ index }) => ({ index }))(Index);

