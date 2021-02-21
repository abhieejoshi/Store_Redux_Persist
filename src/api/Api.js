import axios from 'axios';
import Constants from 'constants';
import EndPoints from './EndPoints';

const commonHeaders = {
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  baseURL: Constants.BASE_URL,
  timeout: 1000 * 60,
  headers: commonHeaders,
});

const GetClient = function (url, params = null, headers = commonHeaders) {
  axiosClient.defaults.headers = headers;
  return new Promise(function (resolve, reject) {
    axiosClient
      .get(url, params)
      .then(function (response) {
        resolve(response);
        console.log(url, response);
      })
      .catch(function (error) {
        reject(error);
        console.log(url, error);
      });
  });
};

const PostClient = function (
  url,
  params = null,
  headers = commonHeaders,
) {
  axiosClient.defaults.headers = headers;
  console.log('params ===== ', url, params);
  return new Promise(function (resolve, reject) {
    axiosClient
      .post(url, params)
      .then(function (response) {
        resolve(response);
        console.log('API SUCCESS', url, response);
      })
      .catch(function (error) {
        reject(error.response.data);
        console.log('API ERROR', url, JSON.parse(JSON.stringify(error)));
      });
  });
};

const PutClient = function (
  url,
  params = null,
  headers = commonHeaders,
) {
  axiosClient.defaults.headers = headers;
  console.log('params ===== ', url, params);
  return new Promise(function (resolve, reject) {
    axiosClient
      .put(url, params)
      .then(function (response) {
        resolve(response);
        console.log('API SUCCESS', url, response);
      })
      .catch(function (error) {
        reject(error.response.data);
        console.log('API ERROR', url, JSON.parse(JSON.stringify(error)));
      });
  });
};

module.exports = {
  GetClient,
  PostClient,
  PutClient,
  EndPoints,
};
