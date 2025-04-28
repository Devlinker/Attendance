import axios from 'axios';

let data;

export const axiosPublic = axios.create();
export const axiosPrivate = axios.create();

/* eslint-disable */

axiosPrivate.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem('token');

    config.headers = {
      Authorization: `Bearer ${access_token}`,
    };
    data = { ...config.data };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosPrivate.interceptors.response.use(response => response, async function(
  error,
) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    originalRequest.data = data;

    return axiosPrivate(originalRequest);
  }
  return Promise.reject(error);
});

const refreshAccessToken = async () => {
  const refreshtoken = localStorage.getItem('refreshtoken');
  const response = await axiosPublic({
    method: 'post',
    url:
      'https://artiegenius-api-dev.cartoonmango.com/v1/api/auth/access-tokens',
    data: {
      refresh_token: refreshtoken,
    },
  });
  if (response.status === 200) {
    localStorage.setItem('token', response.data.data.access_token);
    localStorage.setItem('refreshtoken', response.data.data.refresh_token);
    return response.data.data.refresh_token;
  }
  return response;
};
