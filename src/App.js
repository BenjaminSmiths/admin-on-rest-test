import React from 'react';

import Dashboard from './Dashboard';
import authClient from './authClient';
import {fetchUtils, Admin, Resource} from 'admin-on-rest';
import loopbackRestClient from 'aor-loopback';
import restClient from './restClient';
import { Delete } from 'admin-on-rest/lib/mui';

// import PostIcon from 'material-ui/svg-icons/action/book';
// import UserIcon from 'material-ui/svg-icons/social/group';
// import {PostList, PostEdit, PostCreate} from './posts';
// import {UserList} from './users';
// <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} icon={PostIcon}/>
// <Resource name="users" list={UserList} icon={UserIcon}/>

import {CollectionsList, CollectionsEdit, CollectionsCreate, TemplateList, TemplateEdit, TemplateCreate} from './api/';

// const httpClient = (url, options) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     // add your own headers here
//     // options.headers.set('X-Custom-Header', 'foobar');
//     return fetchUtils.fetchJson(url, options);
// };

const App = () => (
    <Admin title="qExtra console" authClient={authClient} dashboard={Dashboard} restClient={restClient}>
        <Resource name="collections" list={CollectionsList} edit={CollectionsEdit} create={CollectionsCreate} remove={Delete}/>
        <Resource name="templates" list={TemplateList} edit={TemplateEdit} create={TemplateCreate} remove={Delete}/>
    </Admin>
);


export default App;
