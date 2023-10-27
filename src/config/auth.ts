// get access token from localstorage
const accessToken = localStorage.getItem("access_token");

// auth token header
export const REQUEST_CONFIG = {
    headers: {
        Authorization: `Bearer ${ accessToken }`
    }
}