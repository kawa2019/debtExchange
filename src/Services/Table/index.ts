import { DebtApi, DebtApiKey } from '../Api/interfaces';
import { Order } from './interfaces';

export const getSortedDebts = (debts: DebtApi[], sortField: DebtApiKey, sortOrder: Order) => {
  return [...debts].sort((a, b) => {
    return (
      a[sortField].toString().localeCompare(b[sortField].toString(), 'pl', {
        numeric: true,
      }) * (sortOrder === 'asc' ? 1 : -1)
    );
  });
};
