import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from 'aos';

import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Home from './containers/Frontend/Home';

import * as actions from './store/actions';

import 'aos/dist/aos.css';

// User routes
const asyncUserCmsGlobal = asyncComponent(() => import('./containers/Backend/User/Cms/Global'));
const asyncUserCmsGeneral = asyncComponent(() => import('./containers/Backend/User/Cms/General'));
const asyncUserCmsMessages = asyncComponent(() => import('./containers/Backend/User/Cms/Messages'));
const asyncUserCmsComponents = asyncComponent(() => import('./containers/Backend/User/Cms/Components'));
const asyncUserCmsAuth = asyncComponent(() => import('./containers/Backend/User/Cms/Auth'));
const asyncUserCmsBackend = asyncComponent(() => import('./containers/Backend/User/Cms/Backend'));

const asyncUserCustomers = asyncComponent(() => import('./containers/Backend/User/Customers'));
const asyncUserCustomersAdd = asyncComponent(() => import('./containers/Backend/User/Customers/Add'));
const asyncUserCustomersEdit = asyncComponent(() => import('./containers/Backend/User/Customers/Edit'));

const asyncUserDashboard = asyncComponent(() => import('./containers/Backend/User/Dashboard/Dashboard'));

const asyncUserEmployees = asyncComponent(() => import('./containers/Backend/User/Employees'));
const asyncUserEmployeesAdd = asyncComponent(() => import('./containers/Backend/User/Employees/Add'));
const asyncUserEmployeesEdit = asyncComponent(() => import('./containers/Backend/User/Employees/Edit'));

const asyncUserFeatures = asyncComponent(() => import('./containers/Backend/User/Features'));
const asyncUserFeaturesAdd = asyncComponent(() => import('./containers/Backend/User/Features/Add'));
const asyncUserFeaturesEdit = asyncComponent(() => import('./containers/Backend/User/Features/Edit'));

const asyncUserInvoices = asyncComponent(() => import('./containers/Backend/User/Invoices'));
const asyncUserInvoicesAdd = asyncComponent(() => import('./containers/Backend/User/Invoices/Add'));
const asyncUserInvoicesEdit = asyncComponent(() => import('./containers/Backend/User/Invoices/Edit'));

const asyncUserLanguages = asyncComponent(() => import('./containers/Backend/User/Languages'));
const asyncUserLanguagesAdd = asyncComponent(() => import('./containers/Backend/User/Languages/Add'));
const asyncUserLanguagesEdit = asyncComponent(() => import('./containers/Backend/User/Languages/Edit'));

const asyncUserMembers = asyncComponent(() => import('./containers/Backend/User/Members'));
const asyncUserMembersAdd = asyncComponent(() => import('./containers/Backend/User/Members/Add'));
const asyncUserMembersEdit = asyncComponent(() => import('./containers/Backend/User/Members/Edit'));

const asyncUserProducts = asyncComponent(() => import('./containers/Backend/User/Products'));
const asyncUserProductsAdd = asyncComponent(() => import('./containers/Backend/User/Products/Add'));
const asyncUserProductsEdit = asyncComponent(() => import('./containers/Backend/User/Products/Edit'));

const asyncUserRoles = asyncComponent(() => import('./containers/Backend/User/Roles'));
const asyncUserRolesAdd = asyncComponent(() => import('./containers/Backend/User/Roles/Add'));
const asyncUserRolesEdit = asyncComponent(() => import('./containers/Backend/User/Roles/Edit'));

const asyncUserSettingsLanguage = asyncComponent(() => import('./containers/Backend/User/Settings/Language'));

const asyncUserTasks = asyncComponent(() => import('./containers/Backend/User/Tasks'));
const asyncUserTasksAdd = asyncComponent(() => import('./containers/Backend/User/Tasks/Add'));
const asyncUserTasksEdit = asyncComponent(() => import('./containers/Backend/User/Tasks/Edit'));

const asyncUserUsers = asyncComponent(() => import('./containers/Backend/User/Users'));
const asyncUserUsersAdd = asyncComponent(() => import('./containers/Backend/User/Users/Add'));
const asyncUserUsersEdit = asyncComponent(() => import('./containers/Backend/User/Users/Edit'));

// Admin routes
const asyncAdminAdmins = asyncComponent(() => import('./containers/Backend/Admin/Admins'));
const asyncAdminAdminsAdd = asyncComponent(() => import('./containers/Backend/Admin/Admins/Add'));
const asyncAdminAdminsEdit = asyncComponent(() => import('./containers/Backend/Admin/Admins/Edit'));

const asyncAdminCmsGlobal = asyncComponent(() => import('./containers/Backend/Admin/Cms/Global'));
const asyncAdminCmsGeneral = asyncComponent(() => import('./containers/Backend/Admin/Cms/General'));
const asyncAdminCmsMessages = asyncComponent(() => import('./containers/Backend/Admin/Cms/Messages'));
const asyncAdminCmsComponents = asyncComponent(() => import('./containers/Backend/Admin/Cms/Components'));
const asyncAdminCmsAuth = asyncComponent(() => import('./containers/Backend/Admin/Cms/Auth'));
const asyncAdminCmsBackend = asyncComponent(() => import('./containers/Backend/Admin/Cms/Backend'));

const asyncAdminDashboard = asyncComponent(() => import('./containers/Backend/Admin/Dashboard/Dashboard'));

const asyncAdminFeatures = asyncComponent(() => import('./containers/Backend/Admin/Features'));
const asyncAdminFeaturesAdd = asyncComponent(() => import('./containers/Backend/Admin/Features/Add'));
const asyncAdminFeaturesEdit = asyncComponent(() => import('./containers/Backend/Admin/Features/Edit'));

const asyncAdminLanguages = asyncComponent(() => import('./containers/Backend/Admin/Languages'));
const asyncAdminLanguagesAdd = asyncComponent(() => import('./containers/Backend/Admin/Languages/Add'));
const asyncAdminLanguagesEdit = asyncComponent(() => import('./containers/Backend/Admin/Languages/Edit'));

const asyncAdminRoles = asyncComponent(() => import('./containers/Backend/Admin/Roles'));
const asyncAdminRolesAdd = asyncComponent(() => import('./containers/Backend/Admin/Roles/Add'));
const asyncAdminRolesEdit = asyncComponent(() => import('./containers/Backend/Admin/Roles/Edit'));

const asyncAdminSettingsLanguage = asyncComponent(() => import('./containers/Backend/Admin/Settings/Language'));

const asyncAdminUsers = asyncComponent(() => import('./containers/Backend/Admin/Users'));
const asyncAdminUsersAdd = asyncComponent(() => import('./containers/Backend/Admin/Users/Add'));
const asyncAdminUsersEdit = asyncComponent(() => import('./containers/Backend/Admin/Users/Edit'));

// Auth routes
const asyncUserLogin = asyncComponent(() => import('./containers/Auth/User/Login/Login'));

const asyncAdminLogin = asyncComponent(() => import('./containers/Auth/Admin/Login/Login'));
const asyncAdminVerify = asyncComponent(() => import('./containers/Auth/Admin/Verify/Verify'));

// Common routes
const asyncCalculation = asyncComponent(() => import('./containers/Frontend/Calculation'));

class App extends Component {
    componentDidMount() {
        const { onTryAuthSignup, onGetContent } = this.props;
        onTryAuthSignup();
        onGetContent();
        init();
    }

    render() {
        const { content: { cms }, auth: { role } } = this.props;
        const isAuthenticated = localStorage.getItem('token') !== null;

        let routes = (
            <Switch>
                <Route path="/auth/admin/verify" component={asyncAdminVerify} />
                <Route path="/auth/admin/login" component={asyncAdminLogin} />
                <Redirect path="/admin" to="/auth/admin/login" />

                <Route path="/auth/user/login" component={asyncUserLogin} />

                <Redirect to="/auth/user/login" path="/auth" />
                <Redirect to="/auth/user/login" path="/user" />

                <Route path="/calculation" component={asyncCalculation} />

                <Route path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        );

        if (isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/user/cms/global" component={asyncUserCmsGlobal} />
                    <Route path="/user/cms/general" component={asyncUserCmsGeneral} />
                    <Route path="/user/cms/messages" component={asyncUserCmsMessages} />
                    <Route path="/user/cms/components" component={asyncUserCmsComponents} />
                    <Route path="/user/cms/auth" component={asyncUserCmsAuth} />
                    <Route path="/user/cms/backend" component={asyncUserCmsBackend} />

                    <Route path="/user/customers/:customerId/edit" component={asyncUserCustomersEdit} />
                    <Route path="/user/customers/add" component={asyncUserCustomersAdd} />
                    <Route path="/user/customers" component={asyncUserCustomers} />

                    <Route path="/user/dashboard" component={asyncUserDashboard} />

                    <Route path="/user/employees/:employeeId/edit" component={asyncUserEmployeesEdit} />
                    <Route path="/user/employees/add" component={asyncUserEmployeesAdd} />
                    <Route path="/user/employees" component={asyncUserEmployees} />

                    <Route path="/user/features/:featureId/edit" component={asyncUserFeaturesEdit} />
                    <Route path="/user/features/add" component={asyncUserFeaturesAdd} />
                    <Route path="/user/features" component={asyncUserFeatures} />

                    <Route path="/user/invoices/:invoiceId/edit" component={asyncUserInvoicesEdit} />
                    <Route path="/user/invoices/add" component={asyncUserInvoicesAdd} />
                    <Route path="/user/invoices" component={asyncUserInvoices} />

                    <Route path="/user/languages/:languageId/edit" component={asyncUserLanguagesEdit} />
                    <Route path="/user/languages/add" component={asyncUserLanguagesAdd} />
                    <Route path="/user/languages" component={asyncUserLanguages} />

                    <Route path="/user/members/:memberId/edit" component={asyncUserMembersEdit} />
                    <Route path="/user/members/add" component={asyncUserMembersAdd} />
                    <Route path="/user/members" component={asyncUserMembers} />

                    <Route path="/user/products/:productId/edit" component={asyncUserProductsEdit} />
                    <Route path="/user/products/add" component={asyncUserProductsAdd} />
                    <Route path="/user/products" component={asyncUserProducts} />

                    <Route path="/user/roles/:roleId/edit" component={asyncUserRolesEdit} />
                    <Route path="/user/roles/add" component={asyncUserRolesAdd} />
                    <Route path="/user/roles" component={asyncUserRoles} />

                    <Route path="/user/settings/language" component={asyncUserSettingsLanguage} />

                    <Route path="/user/tasks/:taskId/edit" component={asyncUserTasksEdit} />
                    <Route path="/user/tasks/add" component={asyncUserTasksAdd} />
                    <Route path="/user/tasks" component={asyncUserTasks} />

                    <Route path="/user/users/:userId/edit" component={asyncUserUsersEdit} />
                    <Route path="/user/users/add" component={asyncUserUsersAdd} />
                    <Route path="/user/users" component={asyncUserUsers} />



                    <Route path="/admin/admins/:adminId/edit" component={asyncAdminAdminsEdit} />
                    <Route path="/admin/admins/add" component={asyncAdminAdminsAdd} />
                    <Route path="/admin/admins" component={asyncAdminAdmins} />

                    <Route path="/admin/cms/global" component={asyncAdminCmsGlobal} />
                    <Route path="/admin/cms/general" component={asyncAdminCmsGeneral} />
                    <Route path="/admin/cms/messages" component={asyncAdminCmsMessages} />
                    <Route path="/admin/cms/components" component={asyncAdminCmsComponents} />
                    <Route path="/admin/cms/auth" component={asyncAdminCmsAuth} />
                    <Route path="/admin/cms/backend" component={asyncAdminCmsBackend} />

                    <Route path="/admin/dashboard" component={asyncAdminDashboard} />

                    <Route path="/admin/features/:featureId/edit" component={asyncAdminFeaturesEdit} />
                    <Route path="/admin/features/add" component={asyncAdminFeaturesAdd} />
                    <Route path="/admin/features" component={asyncAdminFeatures} />

                    <Route path="/admin/languages/:languageId/edit" component={asyncAdminLanguagesEdit} />
                    <Route path="/admin/languages/add" component={asyncAdminLanguagesAdd} />
                    <Route path="/admin/languages" component={asyncAdminLanguages} />

                    <Route path="/admin/roles/:roleId/edit" component={asyncAdminRolesEdit} />
                    <Route path="/admin/roles/add" component={asyncAdminRolesAdd} />
                    <Route path="/admin/roles" component={asyncAdminRoles} />

                    <Route path="/admin/settings/language" component={asyncAdminSettingsLanguage} />

                    <Route path="/admin/users/:userId/edit" component={asyncAdminUsersEdit} />
                    <Route path="/admin/users/add" component={asyncAdminUsersAdd} />
                    <Route path="/admin/users" component={asyncAdminUsers} />



                    <Redirect to={`/${role}/dashboard`} path={role} />
                    <Redirect to={`/${role}/dashboard`} path="/auth" />



                    <Route path="/calculation" component={asyncCalculation} />

                    <Route path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        const dataReady = cms !== undefined && ((isAuthenticated && role !== undefined) || !isAuthenticated);

        return dataReady && <Layout>
            {routes}
        </Layout>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onTryAuthSignup: () => dispatch(actions.authCheckState()),
    onGetContent: () => dispatch(actions.getContent()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
