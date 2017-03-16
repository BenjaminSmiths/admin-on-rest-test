import React from 'react';
import {
    ReferenceManyField,
    SingleFieldList,
    ChipField,
    SimpleList,
    Responsive,
    Filter,
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton,
    DeleteButton,
    DisabledInput,
    LongTextInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField
} from 'admin-on-rest/lib/mui';

import RaisedButton from 'material-ui/RaisedButton';

import ArrayField from '../ui/ArrayField';


const TemplateTitle = ({record}) => {
    return <span>Collection {record ? `"${record.name}"` : ''}</span>;
};

const TemplateFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Id" source="id"/>
        <TextInput label="Name" source="name"/>
    </Filter>
);

export const TemplateList = (props) => {
    console.log('TemplateList', props);
    return <List {...props}>
        <Datagrid>
            <TextField source="name"/>
            <TextField source="type"/>
            <ArrayField label="Fields" source="fields">
                <Datagrid currentSort="name">
                    <TextField source="name" />
                    <TextField source="type" />
                </Datagrid>
            </ArrayField>
            <EditButton />
        </Datagrid>
    </List>
};

export const TemplateEdit = (props) => (
    <Edit title={<TemplateTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <TextInput source="name"/>
        </SimpleForm>
    </Edit>
);

export const TemplateCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            {
                fieldTypes.map(fields => {
                    return <span>
                        <TextInput source="name"/>
                        <TextInput source="fieldType"/>
                    </span>
                })
            }
            <RaisedButton label="+ Add Field Type" />
        </SimpleForm>
    </Create>
);