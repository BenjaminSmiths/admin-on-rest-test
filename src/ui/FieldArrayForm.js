import React, { PropTypes } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getDefaultValues from '../form/getDefaultValues';
import FormField from './FormField';
import Toolbar from './Toolbar';

export const FieldArrayForm = ({ children, handleSubmit, invalid, record, resource, basePath }) => (
    <form onSubmit={handleSubmit}>
        <div style={{ padding: '0 1em 1em 1em' }}>
            {React.Children.map(children, input => input && (
                <div key={input.props.source} style={input.props.style}>
                    <FormField input={input} resource={resource} record={record} basePath={basePath} />
                    <FieldArray component={resource}/>
                </div>
            ))}
        </div>
        <Toolbar invalid={invalid} />
    </form>
);

FieldArrayForm.propTypes = {
    children: PropTypes.node,
    defaultValue: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
    ]),
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    validation: PropTypes.func,
};

const enhance = compose(
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
    })),
    reduxForm({
        form: 'array-form',
        validate: validateForm,
        enableReinitialize: true,
    }),
);

export default enhance(SimpleForm);
