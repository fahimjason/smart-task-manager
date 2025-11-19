export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    TEAMS: '/teams',
    PROJECTS: '/projects',
    TASKS: '/tasks',
    ANALYTICS: '/analytics',
    ACTIVITY: '/activity',
    PROFILE: '/profile',
    NOT_FOUND: '/404',
};

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
export const PRIVATE_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.TEAMS,
    ROUTES.PROJECTS,
    ROUTES.TASKS,
    ROUTES.ANALYTICS,
    ROUTES.ACTIVITY,
    ROUTES.PROFILE,
];

export default ROUTES;