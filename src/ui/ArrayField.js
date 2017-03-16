import React, { Component, PropTypes } from 'react';

/**
 * Render records specified by an array of embed data objects in current one.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * <List {...props}}>
 *     <Datagrid>
 *         <TextField source="name"/>
 *         <ArrayField label="Panel List" source="panels">
 *             <Datagrid>
 *                 <TextField source="id"/>
 *                 <TextField source="name"/>
 *             </Datagrid>
 *         </ArrayField>
 *     </Datagrid>
 * </List>
 */
class ArrayField extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { record, source } = this.props;

    }

    render() {
        const { children, record, source, basePath } = this.props;
        const arraySource = record[source];
        const data = arraySource
            .reduce((prev, next) => {
                prev[next.id] = next;
                return prev;
            }, {});

        if (React.Children.count(children) !== 1) {
            throw new Error('<ArrayField> only accepts a single child (like <Datagrid>)');
        }

        return React.cloneElement(children, {
            ids: arraySource.map(s => s.id),
            data,
            basePath: basePath +'/'+ source
        });
    }
}
ArrayField.propTypes = {
    addLabel: PropTypes.bool,
    children: PropTypes.element.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    data: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default ArrayField;