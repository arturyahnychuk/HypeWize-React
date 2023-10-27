const API_ROOT_URL = `${import.meta.env.VITE_API_ENDPOINT}`;
// Authentication APIs
export const LOGIN_API_URL = `${ API_ROOT_URL }/auth/login`;
export const REGISTER_API_URL = `${ API_ROOT_URL }/auth/register`;
export const REFRESH_TOKENS_URL = `${ API_ROOT_URL }/auth/refresh_tokens`;

// Projects APIs
export const PROJECTS_ROOT_URL = `${ API_ROOT_URL }/projects`
export const FETCH_PROJECTS_DATA_URL = `${ PROJECTS_ROOT_URL }?limit=10&sortBy=createdAt:desc`;
export const PROJECT_TAGS_URL = `${ API_ROOT_URL }/tags`;
export const MESSAGES_URL = `${ API_ROOT_URL }/messages`;
export const METADATA_URL = `${ API_ROOT_URL }/metadata`;
export const CONTENTS_URL = `${ API_ROOT_URL }/contents`;

// Billing APIs
export const BILLING_URL = `${ API_ROOT_URL }/billing`;

// Usage APIs
export const USAGE_STATS_URL = `${ API_ROOT_URL }/stats`;

// Starter Guide APIs
export const STARTER_GUID_URL = `${ API_ROOT_URL }/starter-guide`;
export const USERS_URL = `${ API_ROOT_URL }/users`;

// Setting APIs
export const HUBSPOT_AUTH_URL = `${ API_ROOT_URL }/auth/hubspot`;
export const GOOGLE_AUTH_URL = `${ API_ROOT_URL }/auth/google`;
export const SEND_VERIFICATION_EMAIL_URL = `${ API_ROOT_URL }/auth/send-verification-email`;
export const APIS_URL = `${ API_ROOT_URL }/apis`;
export const FORGOT_PASSWORD_URL = `${ API_ROOT_URL }/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${ API_ROOT_URL }/auth/reset-password`;
export const VERIFY_EMAIL_URL = `${ API_ROOT_URL }/auth/verify-email`;


// Payment API
export const PAYMENT_API = `${ API_ROOT_URL }/payments`;