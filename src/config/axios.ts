import axios, { AxiosRequestConfig } from 'axios';

export enum AxiosClientFactoryEnum {
  AUTH = 'auth',
  SHOP = 'shop',
  MARKETING = 'marketing',
  WAREHOUSE = 'warehouse',
}

export const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray =
      isParamTypeObject && Array.isArray(params[key]) && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const auth = `https://artvistaauthapi.azurewebsites.net/api/`;
const shop = `https://artvistamanagementapi.azurewebsites.net/api/`;
const marketing = `https://artvistamarketapi.azurewebsites.net/api/`;
const warehouse = `https://artvistamarketapi.azurewebsites.net/api/`;

const request = axios.create({
  baseURL: auth,
  paramsSerializer: parseParams
});

request.interceptors.request.use((options) => {
  return options;
});

request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

const requestManagement = axios.create({
  baseURL: shop,
  paramsSerializer: parseParams,
  headers: {
    Authorization:
      'Bearer '
  }
});

requestManagement.interceptors.request.use((options) => {
  return options;
});

requestManagement.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

const requestMarket = axios.create({
    baseURL: marketing,
    paramsSerializer: parseParams,
    headers: {
        Authorization:
          'Bearer '
      }
  });
  
  
requestMarket.interceptors.request.use((options) => {
    return options;
  });
  
requestMarket.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
  );

  const requestWarehouse = axios.create({
    baseURL: warehouse,
    paramsSerializer: parseParams,
    headers: {
        Authorization:
          'Bearer '
      }
  });
  
  
requestWarehouse.interceptors.request.use((options) => {
    return options;
  });
  
requestWarehouse.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
  );

class AxiosClientFactory {
  getAxiosClient(type?: AxiosClientFactoryEnum, config: AxiosRequestConfig = {}) {
    switch (type) {
      case 'auth':
        return request;
      case 'shop':
        return requestManagement;
      case 'marketing':
        return requestMarket;
      case 'warehouse':
        return requestWarehouse;
      default:
        return request;
    }
  }
}

const axiosClientFactory = new AxiosClientFactory();

const axiosInstances = {
  auth: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.AUTH),
  shop: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.SHOP),
  marketing: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.MARKETING),
  warehouse: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.WAREHOUSE),
};

export { axiosClientFactory };

export default axiosInstances;
