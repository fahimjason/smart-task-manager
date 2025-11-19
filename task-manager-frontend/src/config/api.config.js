export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1',
    TIMEOUT: 30000,
    HEADERS: {
        'Content-Type': 'application/json',
    },
};

export const ENDPOINTS = {
    // Auth
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_ME: '/auth/me',
    AUTH_UPDATE_DETAILS: '/auth/updatedetails',
    AUTH_UPDATE_PASSWORD: '/auth/updatepassword',
    AUTH_FORGOT_PASSWORD: '/auth/forgotpassword',
    AUTH_RESET_PASSWORD: '/auth/resetpassword',

    // Teams
    TEAMS: '/teams',
    TEAM_BY_ID: (id) => `/teams/${id}`,

    // Projects
    PROJECTS: '/projects',
    PROJECT_BY_ID: (id) => `/projects/${id}`,

    // Tasks
    TASKS: '/tasks',
    TASK_BY_ID: (id) => `/tasks/${id}`,
    TASK_REASSIGN: '/tasks/reassign',
    TASK_CHECK_CAPACITY: '/tasks/check-capacity',
    TASK_AUTO_ASSIGN: '/tasks/auto-assign',

    // Dashboard
    DASHBOARD_SUMMARY: '/dashboard/summary',
    DASHBOARD_STATS: '/dashboard/stats',
    DASHBOARD_OVERLOADED: '/dashboard/overloaded-members',
    DASHBOARD_MEMBER_WORKLOAD: (id) => `/dashboard/member-workload/${id}`,

    // Activity
    ACTIVITY: '/activity',
};

export default API_CONFIG;
