import { queryParameters } from './fetch';

import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';

const API_URL = 'http://localhost:8080/api';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
    resource = resource.toLowerCase();
    let url = '';
    const options = {};
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {};
            query['where'] = Object.keys(params.filter).map((name) => {
                let result = {};
                    result[name] = {'regexp': '^' + params.filter[name].toLocaleLowerCase() + '/i'};
                    return result;
                })[0];

            console.log('filter', params.filter);
            console.log('where', query['where']);

            if (field) query['order'] = [field+' '+order];
            if (perPage > 0) {
                query['limit'] = perPage;
                if (page >= 0) {
                    query['skip'] = (page - 1) * perPage;
                }
            }
            url = `${API_URL}/${resource}?${queryParameters({filter: JSON.stringify(query)})}`;
            break;
        }
        case GET_ONE:
            url = `${API_URL}/${resource}/${params.id}`;
            break;
        case GET_MANY: {
            const listId = params.ids.map(id => {
                return {'id': id};
            });
            const query = {
                'where': {'or': listId}
            };
            url = `${API_URL}/${resource}?${queryParameters({filter: query})}`;
            break;
        }
        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {};
            query['where'] = {...params.filter};
            query['where'][params.target] = params.id;
            if (field) query['order'] = [field+' '+order];
            if (perPage > 0) {
                query['limit'] = perPage;
                if (page >= 0) {
                    query['skip'] = (page - 1) * perPage;
                }
            }
            url = `${API_URL}/${resource}?${queryParameters({filter: query})}`;
            break;
        }
        case UPDATE:
            url = `${API_URL}/${resource}/${params.id}`;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case CREATE:
            url = `${API_URL}/${resource}`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case DELETE:
            url = `${API_URL}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;

    switch (type) {
        case GET_LIST:
            if (!headers.has('x-total-count')) {
                throw new Error('The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?');
            }
            const contentRangeHeader = headers.get('content-range');
            const contentRange = contentRangeHeader ? contentRangeHeader.split('/').pop() : 0;
            return {
                data: json.map(x => x),
                total: parseInt(contentRange, 10),
            };
        case CREATE:
            return {data:{id:json.id}};
        default:
            return {data: { ...json, id: json.id }};
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
};