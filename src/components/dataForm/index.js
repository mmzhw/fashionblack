import React from 'react';
import { Form, Input, DatePicker, Button, InputNumber, Select } from 'antd';
import UploadImg from '../../components/uploadimg';
import EditorTool from '../../components/editortool';
import { DATA_TYPE, DATA_FORMAT, MEMBER_TYPE } from '../../utils/constant';
import moment from 'moment';

const FormItem = Form.Item;

class DataFormClass extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('values', values);
                this.props.formItemArrs.forEach((item) => {
                    if (item.type === DATA_TYPE.DATA) {
                        values[item.key] = moment(values[item.key] * 1000).unix();
                    } else if (item.type === DATA_TYPE.NUMBER) {
                        values[item.key] = parseInt(values[item.key], 10);
                    } else if (item.type === DATA_TYPE.EDITOR && this[item.key]) {
                        values[item.key] = this[item.key];
                    }
                });

                if (self.props.getFormData) {
                    self.props.getFormData(values);
                }
            }
        });
    }

    onDataChange(key, data) {
        this.props.form.setFieldsValue({ [key]: data });
    }

    onEditorChange(key, data) {
        this[key] = data;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemArrs = [] } = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>

                {
                    formItemArrs && formItemArrs.map((item, index) => {
                        if (item.type === DATA_TYPE.TEXT) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [{ required: !!item.needMessage, message: item.needMessage }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            );
                        } else if (item.type === DATA_TYPE.NUMBER) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [{ required: !!item.needMessage, message: item.needMessage }],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            );
                        } else if (item.type === DATA_TYPE.TEXT_AREA) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [{ required: !!item.needMessage, message: item.needMessage }],
                                    })(
                                        <Input.TextArea rows={4} />
                                    )}
                                </FormItem>
                            );
                        } else if (item.type === DATA_TYPE.DATA) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [{ required: !!item.needMessage, message: item.needMessage }],
                                    })(
                                        <DatePicker showTime format={DATA_FORMAT}/>
                                    )}
                                </FormItem>
                            );
                        } else if (item.type === DATA_TYPE.IMG) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [{ required: !!item.needMessage, message: item.needMessage }],
                                    })(
                                        <UploadImg onUploadChange={this.onDataChange.bind(this)}/>
                                    )}
                                </FormItem>
                            );
                        } else if (item.type === DATA_TYPE.SELECT) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [{ required: !!item.needMessage, message: item.needMessage }],
                                    })(
                                        <Select onChange={this.onDataChange.bind(this, item.key)}>
                                            <Select.Option value={0}>平台添加</Select.Option>
                                            <Select.Option value={1}>通过手机号报名</Select.Option>
                                            <Select.Option value={2}>通过微信报名</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                            );
                        } else if (item.type === DATA_TYPE.PHONE) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [
                                            { required: !!item.needMessage, message: item.needMessage },
                                            { max: 11, message: item.maxMessage },
                                        ],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            );
                        } else if (item.type === DATA_TYPE.EDITOR) {
                            return (
                                <FormItem
                                    {...formItemLayout}
                                    label={item.label}
                                    key={index}
                                >
                                    {getFieldDecorator(item.key, {
                                        rules: [{ required: !!item.needMessage, message: item.needMessage }],
                                    })(
                                        <EditorTool onEditorChange={this.onEditorChange.bind(this)}/>
                                    )}
                                </FormItem>
                            );
                        }
                        return '';
                    })
                }
                <FormItem {...formItemLayout} label={'操作'}> <Button type='primary' htmlType='submit'>确认</Button></FormItem>

            </Form>
        );
    }
}

const DataForm = Form.create({
    mapPropsToFields(props) {
        let newValue = {};
        props.formItemArrs.forEach((item) => {
            if (item.type === DATA_TYPE.DATA) {
                newValue[item.key] = Form.createFormField({
                    value: (props.initValues && props.initValues[item.key]) ? (moment(props.initValues[item.key])) : moment()
                });
            } else if (item.type === DATA_TYPE.SELECT) {
                newValue[item.key] = Form.createFormField({
                    value: (props.initValues && props.initValues[item.key]) ? MEMBER_TYPE[props.initValues[item.key]] : ''
                });
            } else {
                newValue[item.key] = Form.createFormField({
                    value: (props.initValues && props.initValues[item.key]) ? (props.initValues[item.key] || '') : '',
                });
            }
        });

        console.log('newValue', newValue);
        return newValue;
    },
})(DataFormClass);
export default DataForm;

