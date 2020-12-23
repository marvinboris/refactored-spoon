import * as actionTypes from './actionTypes';

const prefix = '/api/';



export const resetAdmins = () => ({ type: actionTypes.ADMINS_RESET });
const adminsStart = () => ({ type: actionTypes.ADMINS_START });
const adminsSuccess = data => ({ type: actionTypes.ADMINS_SUCCESS, ...data });
const adminsFail = error => ({ type: actionTypes.ADMINS_FAIL, error });
export const getAdmins = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/admins?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const getAdmin = id => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/admins/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const postAdmins = data => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/admins`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const patchAdmins = (id, data) => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/admins/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};

export const deleteAdmins = id => async (dispatch, getState) => {
    dispatch(adminsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/admins/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(adminsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(adminsFail(error));
    }
};



export const resetCms = () => ({ type: actionTypes.CMS_RESET });
const cmsStart = () => ({ type: actionTypes.CMS_START });
const cmsSuccess = data => ({ type: actionTypes.CMS_SUCCESS, ...data });
const cmsFail = error => ({ type: actionTypes.CMS_FAIL, error });
export const getCms = () => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/cms`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};

export const postCms = data => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/cms`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};

export const patchCms = (id, data) => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/cms/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};

export const deleteCms = id => async (dispatch, getState) => {
    dispatch(cmsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/cms/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(cmsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(cmsFail(error));
    }
};



export const resetCustomers = () => ({ type: actionTypes.CUSTOMERS_RESET });
const customersStart = () => ({ type: actionTypes.CUSTOMERS_START });
const customersSuccess = data => ({ type: actionTypes.CUSTOMERS_SUCCESS, ...data });
const customersFail = error => ({ type: actionTypes.CUSTOMERS_FAIL, error });
export const getCustomers = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(customersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/customers?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(customersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(customersFail(error));
    }
};

export const getCustomer = id => async (dispatch, getState) => {
    dispatch(customersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/customers/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(customersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(customersFail(error));
    }
};

export const postCustomers = data => async (dispatch, getState) => {
    dispatch(customersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/customers`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(customersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(customersFail(error));
    }
};

export const patchCustomers = (id, data) => async (dispatch, getState) => {
    dispatch(customersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/customers/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(customersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(customersFail(error));
    }
};

export const deleteCustomers = id => async (dispatch, getState) => {
    dispatch(customersStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/customers/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(customersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(customersFail(error));
    }
};



export const resetDashboard = () => ({ type: actionTypes.DASHBOARD_RESET });
const dashboardStart = () => ({ type: actionTypes.DASHBOARD_START });
const dashboardSuccess = data => ({ type: actionTypes.DASHBOARD_SUCCESS, ...data });
const dashboardFail = error => ({ type: actionTypes.DASHBOARD_FAIL, error });
export const getDashboard = () => async (dispatch, getState) => {
    dispatch(dashboardStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/dashboard`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(dashboardSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(dashboardFail(error));
    }
};



export const resetEmployees = () => ({ type: actionTypes.EMPLOYEES_RESET });
const employeesStart = () => ({ type: actionTypes.EMPLOYEES_START });
const employeesSuccess = data => ({ type: actionTypes.EMPLOYEES_SUCCESS, ...data });
const employeesFail = error => ({ type: actionTypes.EMPLOYEES_FAIL, error });
export const getEmployees = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(employeesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/employees?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(employeesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(employeesFail(error));
    }
};

export const getEmployee = id => async (dispatch, getState) => {
    dispatch(employeesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/employees/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(employeesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(employeesFail(error));
    }
};

export const postEmployees = data => async (dispatch, getState) => {
    dispatch(employeesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/employees`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(employeesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(employeesFail(error));
    }
};

export const patchEmployees = (id, data) => async (dispatch, getState) => {
    dispatch(employeesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/employees/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(employeesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(employeesFail(error));
    }
};

export const deleteEmployees = id => async (dispatch, getState) => {
    dispatch(employeesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/employees/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(employeesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(employeesFail(error));
    }
};



export const resetFeatures = () => ({ type: actionTypes.FEATURES_RESET });
const featuresStart = () => ({ type: actionTypes.FEATURES_START });
const featuresSuccess = data => ({ type: actionTypes.FEATURES_SUCCESS, ...data });
const featuresFail = error => ({ type: actionTypes.FEATURES_FAIL, error });
export const getFeatures = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const getFeature = id => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const postFeatures = data => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/features`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const patchFeatures = (id, data) => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/features/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};

export const deleteFeatures = id => async (dispatch, getState) => {
    dispatch(featuresStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/features/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(featuresSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(featuresFail(error));
    }
};



export const resetInvoices = () => ({ type: actionTypes.INVOICES_RESET });
const invoicesStart = () => ({ type: actionTypes.INVOICES_START });
const invoicesSuccess = data => ({ type: actionTypes.INVOICES_SUCCESS, ...data });
const invoicesFail = error => ({ type: actionTypes.INVOICES_FAIL, error });
export const getInvoices = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(invoicesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/invoices?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(invoicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(invoicesFail(error));
    }
};

export const getInvoice = id => async (dispatch, getState) => {
    dispatch(invoicesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/invoices/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(invoicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(invoicesFail(error));
    }
};

export const getInvoicesInfo = () => async (dispatch, getState) => {
    dispatch(invoicesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/invoices/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(invoicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(invoicesFail(error));
    }
};

export const postInvoices = data => async (dispatch, getState) => {
    dispatch(invoicesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/invoices`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(invoicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(invoicesFail(error));
    }
};

export const patchInvoices = (id, data) => async (dispatch, getState) => {
    dispatch(invoicesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/invoices/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(invoicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(invoicesFail(error));
    }
};

export const deleteInvoices = id => async (dispatch, getState) => {
    dispatch(invoicesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/invoices/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(invoicesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(invoicesFail(error));
    }
};



export const resetLanguages = () => ({ type: actionTypes.LANGUAGES_RESET });
const languagesStart = () => ({ type: actionTypes.LANGUAGES_START });
const languagesSuccess = data => ({ type: actionTypes.LANGUAGES_SUCCESS, ...data });
const languagesFail = error => ({ type: actionTypes.LANGUAGES_FAIL, error });
export const getLanguages = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const getLanguage = id => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const postLanguages = data => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/languages`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const patchLanguages = (id, data) => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/languages/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};

export const deleteLanguages = id => async (dispatch, getState) => {
    dispatch(languagesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/languages/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(languagesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(languagesFail(error));
    }
};



export const resetMembers = () => ({ type: actionTypes.MEMBERS_RESET });
const membersStart = () => ({ type: actionTypes.MEMBERS_START });
const membersSuccess = data => ({ type: actionTypes.MEMBERS_SUCCESS, ...data });
const membersFail = error => ({ type: actionTypes.MEMBERS_FAIL, error });
export const getMembers = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(membersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/members?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(membersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(membersFail(error));
    }
};

export const getMember = id => async (dispatch, getState) => {
    dispatch(membersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/members/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(membersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(membersFail(error));
    }
};

export const postMembers = data => async (dispatch, getState) => {
    dispatch(membersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/members`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(membersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(membersFail(error));
    }
};

export const patchMembers = (id, data) => async (dispatch, getState) => {
    dispatch(membersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/members/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(membersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(membersFail(error));
    }
};

export const deleteMembers = id => async (dispatch, getState) => {
    dispatch(membersStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/members/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(membersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(membersFail(error));
    }
};



export const resetPosts = () => ({ type: actionTypes.POSTS_RESET });
const postsStart = () => ({ type: actionTypes.POSTS_START });
const postsSuccess = data => ({ type: actionTypes.POSTS_SUCCESS, ...data });
const postsFail = error => ({ type: actionTypes.POSTS_FAIL, error });
export const getPosts = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(postsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/posts?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(postsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(postsFail(error));
    }
};

export const getPost = id => async (dispatch, getState) => {
    dispatch(postsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/posts/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(postsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(postsFail(error));
    }
};

export const postPosts = data => async (dispatch, getState) => {
    dispatch(postsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/posts`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(postsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(postsFail(error));
    }
};

export const patchPosts = (id, data) => async (dispatch, getState) => {
    dispatch(postsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/posts/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(postsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(postsFail(error));
    }
};

export const deletePosts = id => async (dispatch, getState) => {
    dispatch(postsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/posts/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(postsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(postsFail(error));
    }
};



export const resetProducts = () => ({ type: actionTypes.PRODUCTS_RESET });
const productsStart = () => ({ type: actionTypes.PRODUCTS_START });
const productsSuccess = data => ({ type: actionTypes.PRODUCTS_SUCCESS, ...data });
const productsFail = error => ({ type: actionTypes.PRODUCTS_FAIL, error });
export const getProducts = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(productsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/products?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(productsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(productsFail(error));
    }
};

export const getProduct = id => async (dispatch, getState) => {
    dispatch(productsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/products/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(productsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(productsFail(error));
    }
};

export const postProducts = data => async (dispatch, getState) => {
    dispatch(productsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/products`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(productsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(productsFail(error));
    }
};

export const patchProducts = (id, data) => async (dispatch, getState) => {
    dispatch(productsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/products/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(productsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(productsFail(error));
    }
};

export const deleteProducts = id => async (dispatch, getState) => {
    dispatch(productsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/products/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(productsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(productsFail(error));
    }
};



export const resetRoles = () => ({ type: actionTypes.ROLES_RESET });
const rolesStart = () => ({ type: actionTypes.ROLES_START });
const rolesSuccess = data => ({ type: actionTypes.ROLES_SUCCESS, ...data });
const rolesFail = error => ({ type: actionTypes.ROLES_FAIL, error });
export const getRoles = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const getRole = id => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const getRolesInfo = () => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const postRoles = data => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/roles`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const patchRoles = (id, data) => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/roles/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const deleteRoles = id => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};



export const resetTasks = () => ({ type: actionTypes.TASKS_RESET });
const tasksStart = () => ({ type: actionTypes.TASKS_START });
const tasksSuccess = data => ({ type: actionTypes.TASKS_SUCCESS, ...data });
const tasksFail = error => ({ type: actionTypes.TASKS_FAIL, error });
export const getTasks = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(tasksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/tasks?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(tasksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(tasksFail(error));
    }
};

export const getTask = id => async (dispatch, getState) => {
    dispatch(tasksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/tasks/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(tasksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(tasksFail(error));
    }
};

export const postTasks = data => async (dispatch, getState) => {
    dispatch(tasksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/tasks`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(tasksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(tasksFail(error));
    }
};

export const patchTasks = (id, data) => async (dispatch, getState) => {
    dispatch(tasksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/tasks/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(tasksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(tasksFail(error));
    }
};

export const deleteTasks = id => async (dispatch, getState) => {
    dispatch(tasksStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/tasks/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(tasksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(tasksFail(error));
    }
};



export const resetUsers = () => ({ type: actionTypes.USERS_RESET });
const usersStart = () => ({ type: actionTypes.USERS_START });
const usersSuccess = data => ({ type: actionTypes.USERS_SUCCESS, ...data });
const usersFail = error => ({ type: actionTypes.USERS_FAIL, error });
export const getUsers = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const getUser = id => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const getUsersInfo = () => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const postUsers = data => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/users`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const patchUsers = (id, data) => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/users/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const deleteUsers = id => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};