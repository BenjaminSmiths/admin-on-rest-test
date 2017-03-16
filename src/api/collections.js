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

import ArrayField from '../ui/ArrayField';


const CollectionsTitle = ({record}) => {
    return <span>Collection {record ? `"${record.name}"` : ''}</span>;
};

const CollectionsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Id" source="id"/>
        <TextInput label="Name" source="name"/>
    </Filter>
);

export const CollectionsList = (props) => {
    console.log('CollectionsList', props);
    return <List {...props} filters={<CollectionsFilter />}>
        <Datagrid>
            <TextField source="name"/>
            <ArrayField label="Products" source="panels">
                <SingleFieldList currentSort="id">
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
};

export const CollectionsEdit = (props) => (
    <Edit title={<CollectionsTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <TextInput source="name"/>
            <ReferenceInput label="Choice Template" source="panels[0].templateType" reference="templates">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ImageInput source="pictures" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const CollectionsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <ReferenceInput label="Choice Template" source="id" reference="templates">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);