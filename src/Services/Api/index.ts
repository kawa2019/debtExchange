import { getAxiosWithConfig } from './config';
import { DebtApi, FilteredDebtsBody } from './interfaces';

export const getTopDebts = async (): Promise<DebtApi[]> => {
  try {
    const endpoint = 'GetTopDebts';
    const instance = getAxiosWithConfig();

    const { data } = await instance.get(endpoint);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getFilteredDebts = async (body: FilteredDebtsBody): Promise<DebtApi[]> => {
  try {
    const endpoint = 'GetFilteredDebts';
    const instance = getAxiosWithConfig();

    const { data } = await instance.post(endpoint, body);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};
