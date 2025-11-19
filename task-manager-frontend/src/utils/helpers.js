export const getStatusColor = (status) => {
    switch (status) {
        case 'Done':
            return 'success';
        case 'In Progress':
            return 'primary';
        case 'Pending':
            return 'warning';
        default:
            return 'default';
    }
};

export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'High':
            return 'danger';
        case 'Medium':
            return 'warning';
        case 'Low':
            return 'success';
        default:
            return 'default';
    }
};

export const calculateWorkloadPercentage = (current, capacity) => {
    if (capacity === 0) return 0;
    return Math.min(Math.round((current / capacity) * 100), 100);
};

export const isOverloaded = (current, capacity) => {
    return current > capacity;
};

export const sortByDate = (arr, field = 'createdAt', order = 'desc') => {
    return [...arr].sort((a, b) => {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
};

export const filterByStatus = (tasks, status) => {
    if (!status) return tasks;
    return tasks.filter((task) => task.status === status);
};

export const filterByPriority = (tasks, priority) => {
    if (!priority) return tasks;
    return tasks.filter((task) => task.priority === priority);
};

export const groupByKey = (arr, key) => {
    return arr.reduce((result, item) => {
        const groupKey = item[key];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
};