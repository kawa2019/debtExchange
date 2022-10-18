import axios, { AxiosInstance } from 'axios';

export const getAxiosWithConfig = (): AxiosInstance => {
  const baseUrl = 'http://rekrutacja-webhosting.it.krd.pl/api/Recruitment';

  return axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
