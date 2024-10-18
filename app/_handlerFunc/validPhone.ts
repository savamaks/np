const regexpValidPhone = /^((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;

export const validPhone = (phone: string): boolean => {
    if (!regexpValidPhone.test(phone)) {
        return true;
    }
    return false;
};
