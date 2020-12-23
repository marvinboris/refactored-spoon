export {
    authUserLogin,
    authAdminLogin,
    authAdminVerify,
    resendCode,
    authLogout,
    setAuthRedirectPath,
    setHash,
    authCheckState,
} from './auth';

export {
    getContent,
    setLanguage,
} from './content';

export {
    resetAdmins,
    getAdmins,
    getAdmin,
    postAdmins,
    patchAdmins,
    deleteAdmins,

    resetCms,
    getCms,
    postCms,
    patchCms,
    deleteCms,

    resetCustomers,
    getCustomer,
    getCustomers,
    postCustomers,
    patchCustomers,
    deleteCustomers,

    resetDashboard,
    getDashboard,

    resetEmployees,
    getEmployees,
    getEmployee,
    postEmployees,
    patchEmployees,
    deleteEmployees,

    resetFeatures,
    getFeatures,
    getFeature,
    postFeatures,
    patchFeatures,
    deleteFeatures,

    resetInvoices,
    getInvoice,
    getInvoices,
    getInvoicesInfo,
    postInvoices,
    patchInvoices,
    deleteInvoices,

    resetLanguages,
    getLanguages,
    getLanguage,
    postLanguages,
    patchLanguages,
    deleteLanguages,

    resetMembers,
    getMembers,
    getMember,
    postMembers,
    patchMembers,
    deleteMembers,

    resetPosts,
    getPosts,
    getPost,
    postPosts,
    patchPosts,
    deletePosts,

    resetProducts,
    getProducts,
    getProduct,
    postProducts,
    patchProducts,
    deleteProducts,

    resetRoles,
    getRoles,
    getRole,
    getRolesInfo,
    postRoles,
    patchRoles,
    deleteRoles,

    resetTasks,
    getTask,
    getTasks,
    postTasks,
    patchTasks,
    deleteTasks,

    resetUsers,
    getUsers,
    getUser,
    getUsersInfo,
    postUsers,
    patchUsers,
    deleteUsers,
} from './backend';

export {
    resetCalculation,
    getCalculationInfo,
    postCalculation,
} from './frontend';