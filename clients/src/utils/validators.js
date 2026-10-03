export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const minLength = (v, n) => v?.length >= n;
export const required = (v) => v !== undefined && v !== null && v !== '';