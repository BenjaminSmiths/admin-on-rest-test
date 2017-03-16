import React, { PropTypes } from 'react';
export const ListField = ({ children, source, record = {} }) => {
    let panels = record[source];
    return <ul>{
        panels.map(panel => <li>{
            React.cloneElement(children, {record: panel})
        }</li>)
    }</ul>;
};

ListField.propTypes = {
    children: PropTypes.element.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};