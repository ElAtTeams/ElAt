// Form validation rules
export const required = (message = 'Bu alan zorunludur') => (value) => {
  if (!value || !value.toString().trim()) {
    return message;
  }
  return '';
};

export const email = (message = 'Geçerli bir e-posta adresi giriniz') => (value) => {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return message;
  }
  return '';
};

export const minLength = (min, message) => (value) => {
  if (value && value.length < min) {
    return message || `En az ${min} karakter olmalıdır`;
  }
  return '';
};

export const maxLength = (max, message) => (value) => {
  if (value && value.length > max) {
    return message || `En fazla ${max} karakter olmalıdır`;
  }
  return '';
};

export const passwordMatch = (confirmField, message = 'Şifreler eşleşmiyor') => (value, formValues) => {
  if (value && formValues[confirmField] && value !== formValues[confirmField]) {
    return message;
  }
  return '';
};

// Common validation rules
export const VALIDATION_RULES = {
  firstName: [
    required('Ad zorunludur'),
    minLength(2, 'Ad en az 2 karakter olmalıdır'),
  ],
  lastName: [
    required('Soyad zorunludur'),
    minLength(2, 'Soyad en az 2 karakter olmalıdır'),
  ],
  email: [
    required('E-posta zorunludur'),
    email(),
  ],
  password: [
    required('Şifre zorunludur'),
    minLength(6, 'Şifre en az 6 karakter olmalıdır'),
  ],
  confirmPassword: [
    required('Şifre tekrarı zorunludur'),
    passwordMatch('password'),
  ],
};