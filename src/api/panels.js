import React from 'react';
import {List, Datagrid, TextField, ReferenceField, SelectInput, ChipField } from 'admin-on-rest/lib/mui';

export const PanelsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name"/>
        </Datagrid>
    </List>
);