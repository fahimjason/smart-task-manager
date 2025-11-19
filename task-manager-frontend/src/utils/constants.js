export const TASK_STATUS = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
};

export const TASK_PRIORITY = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
};

export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
};

export const CAPACITY_RANGE = {
    MIN: 0,
    MAX: 5,
};

export const TOAST_DURATION = 3000;

export const STATUS_OPTIONS = [
    { value: TASK_STATUS.PENDING, label: 'Pending' },
    { value: TASK_STATUS.IN_PROGRESS, label: 'In Progress' },
    { value: TASK_STATUS.DONE, label: 'Done' },
];

export const PRIORITY_OPTIONS = [
    { value: TASK_PRIORITY.LOW, label: 'Low' },
    { value: TASK_PRIORITY.MEDIUM, label: 'Medium' },
    { value: TASK_PRIORITY.HIGH, label: 'High' },
];
