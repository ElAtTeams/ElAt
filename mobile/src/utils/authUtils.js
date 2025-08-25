// Ortak auth yardımcı fonksiyonları
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function formatDate(date) {
  return date.toISOString().split("T")[0];
}
