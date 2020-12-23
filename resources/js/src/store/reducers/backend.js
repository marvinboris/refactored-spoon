import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    admins: {
        loading: false,
        error: null
    },
    cms: {
        loading: false,
        error: null
    },
    customers: {
        loading: false,
        error: null
    },
    dashboard: {
        loading: false,
        error: null
    },
    employees: {
        loading: false,
        error: null
    },
    features: {
        loading: false,
        error: null
    },
    invoices: {
        loading: false,
        error: null
    },
    languages: {
        loading: false,
        error: null
    },
    members: {
        loading: false,
        error: null
    },
    posts: {
        loading: false,
        error: null
    },
    products: {
        loading: false,
        error: null
    },
    roles: {
        loading: false,
        error: null
    },
    tasks: {
        loading: false,
        error: null
    },
    users: {
        loading: false,
        error: null
    },
};

const adminsReset = (state, action) => updateObject(state, { admins: initialState.admins });
const adminsStart = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: true, message: null }) });
const adminsSuccess = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: false, error: null, ...action }) });
const adminsFail = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: false, ...action }) });

const cmsReset = (state, action) => updateObject(state, { cms: initialState.cms });
const cmsStart = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: true, message: null }) });
const cmsSuccess = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: false, error: null, ...action }) });
const cmsFail = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: false, ...action }) });

const customersReset = (state, action) => updateObject(state, { customers: initialState.customers });
const customersStart = (state, action) => updateObject(state, { customers: updateObject(state.customers, { loading: true, message: null }) });
const customersSuccess = (state, action) => updateObject(state, { customers: updateObject(state.customers, { loading: false, error: null, ...action }) });
const customersFail = (state, action) => updateObject(state, { customers: updateObject(state.customers, { loading: false, ...action }) });

const dashboardReset = (state, action) => updateObject(state, { dashboard: initialState.dashboard });
const dashboardStart = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: true, message: null }) });
const dashboardSuccess = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: false, error: null, ...action }) });
const dashboardFail = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: false, ...action }) });

const employeesReset = (state, action) => updateObject(state, { employees: initialState.employees });
const employeesStart = (state, action) => updateObject(state, { employees: updateObject(state.employees, { loading: true, message: null }) });
const employeesSuccess = (state, action) => updateObject(state, { employees: updateObject(state.employees, { loading: false, error: null, ...action }) });
const employeesFail = (state, action) => updateObject(state, { employees: updateObject(state.employees, { loading: false, ...action }) });

const featuresReset = (state, action) => updateObject(state, { features: initialState.features });
const featuresStart = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: true, message: null }) });
const featuresSuccess = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: false, error: null, ...action }) });
const featuresFail = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: false, ...action }) });

const invoicesReset = (state, action) => updateObject(state, { invoices: initialState.invoices });
const invoicesStart = (state, action) => updateObject(state, { invoices: updateObject(state.invoices, { loading: true, message: null }) });
const invoicesSuccess = (state, action) => updateObject(state, { invoices: updateObject(state.invoices, { loading: false, error: null, ...action }) });
const invoicesFail = (state, action) => updateObject(state, { invoices: updateObject(state.invoices, { loading: false, ...action }) });

const languagesReset = (state, action) => updateObject(state, { languages: initialState.languages });
const languagesStart = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: true, message: null }) });
const languagesSuccess = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: false, error: null, ...action }) });
const languagesFail = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: false, ...action }) });

const membersReset = (state, action) => updateObject(state, { members: initialState.members });
const membersStart = (state, action) => updateObject(state, { members: updateObject(state.members, { loading: true, message: null }) });
const membersSuccess = (state, action) => updateObject(state, { members: updateObject(state.members, { loading: false, error: null, ...action }) });
const membersFail = (state, action) => updateObject(state, { members: updateObject(state.members, { loading: false, ...action }) });

const postsReset = (state, action) => updateObject(state, { posts: initialState.posts });
const postsStart = (state, action) => updateObject(state, { posts: updateObject(state.posts, { loading: true, message: null }) });
const postsSuccess = (state, action) => updateObject(state, { posts: updateObject(state.posts, { loading: false, error: null, ...action }) });
const postsFail = (state, action) => updateObject(state, { posts: updateObject(state.posts, { loading: false, ...action }) });

const productsReset = (state, action) => updateObject(state, { products: initialState.products });
const productsStart = (state, action) => updateObject(state, { products: updateObject(state.products, { loading: true, message: null }) });
const productsSuccess = (state, action) => updateObject(state, { products: updateObject(state.products, { loading: false, error: null, ...action }) });
const productsFail = (state, action) => updateObject(state, { products: updateObject(state.products, { loading: false, ...action }) });

const rolesReset = (state, action) => updateObject(state, { roles: initialState.roles });
const rolesStart = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: true, message: null }) });
const rolesSuccess = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: false, error: null, ...action }) });
const rolesFail = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: false, ...action }) });

const tasksReset = (state, action) => updateObject(state, { tasks: initialState.tasks });
const tasksStart = (state, action) => updateObject(state, { tasks: updateObject(state.tasks, { loading: true, message: null }) });
const tasksSuccess = (state, action) => updateObject(state, { tasks: updateObject(state.tasks, { loading: false, error: null, ...action }) });
const tasksFail = (state, action) => updateObject(state, { tasks: updateObject(state.tasks, { loading: false, ...action }) });

const usersReset = (state, action) => updateObject(state, { users: initialState.users });
const usersStart = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: true, message: null }) });
const usersSuccess = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: false, error: null, ...action }) });
const usersFail = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: false, ...action }) });

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMINS_RESET: return adminsReset(state, action);
        case actionTypes.ADMINS_START: return adminsStart(state, action);
        case actionTypes.ADMINS_SUCCESS: return adminsSuccess(state, action);
        case actionTypes.ADMINS_FAIL: return adminsFail(state, action);

        case actionTypes.CMS_RESET: return cmsReset(state, action);
        case actionTypes.CMS_START: return cmsStart(state, action);
        case actionTypes.CMS_SUCCESS: return cmsSuccess(state, action);
        case actionTypes.CMS_FAIL: return cmsFail(state, action);

        case actionTypes.CUSTOMERS_RESET: return customersReset(state, action);
        case actionTypes.CUSTOMERS_START: return customersStart(state, action);
        case actionTypes.CUSTOMERS_SUCCESS: return customersSuccess(state, action);
        case actionTypes.CUSTOMERS_FAIL: return customersFail(state, action);

        case actionTypes.DASHBOARD_RESET: return dashboardReset(state, action);
        case actionTypes.DASHBOARD_START: return dashboardStart(state, action);
        case actionTypes.DASHBOARD_SUCCESS: return dashboardSuccess(state, action);
        case actionTypes.DASHBOARD_FAIL: return dashboardFail(state, action);

        case actionTypes.EMPLOYEES_RESET: return employeesReset(state, action);
        case actionTypes.EMPLOYEES_START: return employeesStart(state, action);
        case actionTypes.EMPLOYEES_SUCCESS: return employeesSuccess(state, action);
        case actionTypes.EMPLOYEES_FAIL: return employeesFail(state, action);

        case actionTypes.FEATURES_RESET: return featuresReset(state, action);
        case actionTypes.FEATURES_START: return featuresStart(state, action);
        case actionTypes.FEATURES_SUCCESS: return featuresSuccess(state, action);
        case actionTypes.FEATURES_FAIL: return featuresFail(state, action);

        case actionTypes.INVOICES_RESET: return invoicesReset(state, action);
        case actionTypes.INVOICES_START: return invoicesStart(state, action);
        case actionTypes.INVOICES_SUCCESS: return invoicesSuccess(state, action);
        case actionTypes.INVOICES_FAIL: return invoicesFail(state, action);

        case actionTypes.LANGUAGES_RESET: return languagesReset(state, action);
        case actionTypes.LANGUAGES_START: return languagesStart(state, action);
        case actionTypes.LANGUAGES_SUCCESS: return languagesSuccess(state, action);
        case actionTypes.LANGUAGES_FAIL: return languagesFail(state, action);

        case actionTypes.MEMBERS_RESET: return membersReset(state, action);
        case actionTypes.MEMBERS_START: return membersStart(state, action);
        case actionTypes.MEMBERS_SUCCESS: return membersSuccess(state, action);
        case actionTypes.MEMBERS_FAIL: return membersFail(state, action);

        case actionTypes.POSTS_RESET: return postsReset(state, action);
        case actionTypes.POSTS_START: return postsStart(state, action);
        case actionTypes.POSTS_SUCCESS: return postsSuccess(state, action);
        case actionTypes.POSTS_FAIL: return postsFail(state, action);

        case actionTypes.PRODUCTS_RESET: return productsReset(state, action);
        case actionTypes.PRODUCTS_START: return productsStart(state, action);
        case actionTypes.PRODUCTS_SUCCESS: return productsSuccess(state, action);
        case actionTypes.PRODUCTS_FAIL: return productsFail(state, action);

        case actionTypes.ROLES_RESET: return rolesReset(state, action);
        case actionTypes.ROLES_START: return rolesStart(state, action);
        case actionTypes.ROLES_SUCCESS: return rolesSuccess(state, action);
        case actionTypes.ROLES_FAIL: return rolesFail(state, action);

        case actionTypes.TASKS_RESET: return tasksReset(state, action);
        case actionTypes.TASKS_START: return tasksStart(state, action);
        case actionTypes.TASKS_SUCCESS: return tasksSuccess(state, action);
        case actionTypes.TASKS_FAIL: return tasksFail(state, action);

        case actionTypes.USERS_RESET: return usersReset(state, action);
        case actionTypes.USERS_START: return usersStart(state, action);
        case actionTypes.USERS_SUCCESS: return usersSuccess(state, action);
        case actionTypes.USERS_FAIL: return usersFail(state, action);

        default: return state;
    }
};