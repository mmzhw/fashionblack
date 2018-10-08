import React from 'react';
import { Upload, Icon, message } from 'antd';
import { handleIMG, uploadImageReq } from '../../utils/commfun';

class UploadImg extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            title: props.title ? props.title : '图片',
            imgUrl: props.value ? handleIMG(props.value) : '',
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                imgUrl: nextProps.value || '',
            });
        }
    }

    beforeUpload(file) {
        let self = this;
        this.setState({
            loading: true,
        });

        uploadImageReq(file.file, this.props.onUploadChange)
            .then((res) => {
                if (this.props.onUploadChange) {
                    this.props.onUploadChange(self.props.id, res.data.link);
                }
                this.setState({
                    imgUrl: handleIMG(res.data.link),
                    loading: false,
                });
            })
            .catch(() => {
                message.error('鉴权失败');
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className='ant-upload-text'>Upload</div>
            </div>
        );
        const imgUrl = this.state.imgUrl;
        return (
            <Upload
                name='avatar'
                listType='picture-card'
                showUploadList={false}
                customRequest={this.beforeUpload.bind(this)}
            >
                {imgUrl ? (
                    <img src={handleIMG(imgUrl)} style={{ width: '100%' }} alt={this.state.title} />
                ) : uploadButton}
            </Upload>
        );
    }
}

export default UploadImg;
