import React from 'react';
import { connect } from 'dva';
import DataForm from '../../components/dataForm';
import { AC_DETAIL_FORMS, REQUEST_TYPE } from '../../utils/constant';

class AcDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch({ type: 'acDetail/getAcDetail' });
    }

    editActivity(values) {
        this.dispatch({
            type: 'acDetail/edit',
            payload: {
                values: values,
                type: REQUEST_TYPE.DETAIL
            }});
    }

    render() {
        const { detail } = this.props.acDetail;
        return (
            <DataForm
                getFormData={this.editActivity.bind(this)}
                formItemArrs={AC_DETAIL_FORMS}
                initValues={detail}
            />
        );
    }
}
export default connect(({ acDetail }) => ({ acDetail }))(AcDetail);

