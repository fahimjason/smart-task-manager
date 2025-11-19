export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 6;
};

export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

export const validateCapacity = (capacity) => {
    const num = parseInt(capacity);
    return !isNaN(num) && num >= 0 && num <= 5;
};

export const getValidationErrors = (formData, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const value = formData[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !validateRequired(value)) {
            errors[field] = `${field} is required`;
        }

        if (fieldRules.email && !validateEmail(value)) {
            errors[field] = 'Invalid email format';
        }

        if (fieldRules.password && !validatePassword(value)) {
            errors[field] = 'Password must be at least 6 characters';
        }

        if (fieldRules.capacity && !validateCapacity(value)) {
            errors[field] = 'Capacity must be between 0 and 5';
        }
    });

    return errors;
};