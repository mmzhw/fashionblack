import React from 'react';
import { connect } from 'dva';
import { OPTION_FORMS } from '../../utils/constant';
import DataForm from '../../components/dataForm';

class Option extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {
        this.dispatch({ type: 'option/getOption' });
    }

    edit(values) {
        this.dispatch({
            type: 'option/editOption',
            payload: {
                values: values,
            }
        });
    }

    render() {
        return (
            <div>
                <DataForm
                    getFormData={this.edit.bind(this)}
                    formItemArrs={OPTION_FORMS}
                    initValues={{ attention: this.props.option.attention }}
                />
            </div>

        );
    }
}
export default connect(({ option }) => ({ option }))(Option);

