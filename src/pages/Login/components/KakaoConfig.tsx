const HOST_URL = 'https://kauth.kakao.com';
export const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
export const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `${HOST_URL}/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
export const KAKAO_TOKEN_URL = `${HOST_URL}/oauth/token`;
// export const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
// export const KAKAO_ME = 'https://kapi.kakao.com/v2/user/me';
// export const KAKAO_LOGOUT = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
