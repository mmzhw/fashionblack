import React from 'react';
import styles from './index.less';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'dva/index';

const { Header, Content, Sider } = Layout;

class LayoutMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: false,
        };
        this.dispatch = this.props.dispatch;
    }

  onCollapse = (collapsed) => {
      this.setState({ collapsed });
  }

  handleClick = (item) => {
      this.props.match.history.push(item.key);
  }

  logout = () => {
      this.dispatch({ type: 'index/logout' });
      this.props.match.history.push('/');
  }

  render() {
      let { routes, menuNames } = this.props;
      return (
          <Layout style={{ minHeight: '100vh' }}>
              <Sider
                  collapsible
                  collapsed={this.state.collapsed}
                  onCollapse={this.onCollapse}
              >
                  <div className={styles['logo']}>Voting System</div>
                  <Menu theme='dark' defaultSelectedKeys={[this.props.match.location.pathname]} mode='inline' onSelect={this.handleClick}>
                      {
                          routes && routes.map((route) => {
                              if (route.icon) {
                                  return (
                                      <Menu.Item
                                          key={route.key}>
                                          <Icon type={route.icon} />
                                          <span>{route.menuNames[route.menuNames.length - 1]}</span>
                                      </Menu.Item>
                                  );
                              }
                              return '';
                          })
                      }

                  </Menu>
              </Sider>
              <Layout>
                  <Header style={{ background: '#FFFFFF', padding: 0, textAlign: 'right' }} >
                      <a onClick={this.logout} style={{ marginRight: '16px' }}>登出</a>
                  </Header>
                  <Content style={{ margin: '0 16px' }}>
                      <Breadcrumb style={{ margin: '16px 0' }}>
                          {
                              menuNames && menuNames.map((menuName, index) => {
                                  return (<Breadcrumb.Item key={index}>{menuName}</Breadcrumb.Item>);
                              })
                          }
                      </Breadcrumb>
                      <div className={styles['content']}>
                          <this.props.content {...this.props}/>
                      </div>
                  </Content>
              </Layout>
          </Layout>
      );
  }
}

export default connect(({ index }) => ({ index }))(LayoutMenu);

