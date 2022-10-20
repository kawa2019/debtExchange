import { FC, useEffect, useMemo, useState } from 'react';
import { DebtApi, DebtApiKey } from '../../Services/Api/interfaces';
import { getFilteredDebts, getTopDebts } from '../../Services/Api';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './index.sass';
import Loader from '../Loader';

interface TableProps {
  search: string;
  isLoading: boolean;
  handleIsLoading: (value: boolean) => void;
}

const Table: FC<TableProps> = ({ search, isLoading, handleIsLoading }) => {
  const [topDebts, setTopDebts] = useState<DebtApi[]>([]);
  const [filteredDebts, setFilteredDebts] = useState<DebtApi[] | null>(null);

  useEffect(() => {
    (async () => {
      handleIsLoading(true);
      const result = await getTopDebts();
      setTopDebts(result);
      handleIsLoading(false);
    })();
  }, [handleIsLoading]);

  useEffect(() => {
    if (search) {
      (async () => {
        handleIsLoading(true);
        const body = { data: search };
        const result = await getFilteredDebts(body);
        setFilteredDebts(result);
        handleIsLoading(false);
      })();
    }
  }, [search, handleIsLoading]);

  const showedDebts = useMemo(() => {
    return search.length > 3 && filteredDebts ? filteredDebts : topDebts;
  }, [search, filteredDebts, topDebts]);

  const getSortedDebts = (debts: DebtApi[], sortField: DebtApiKey, sortOrder: string) => {
    return [...debts].sort((a, b) => {
      return (
        a[sortField].toString().localeCompare(b[sortField].toString(), 'pl', {
          numeric: true,
        }) * (sortOrder === 'asc' ? 1 : -1)
      );
    });
  };

  const handleSorting = (sortField: DebtApiKey, sortOrder: string) => {
    const sortedTopDebts = getSortedDebts(topDebts, sortField, sortOrder);
    setTopDebts(sortedTopDebts);

    if (filteredDebts) {
      const sortedFilteredDebts = getSortedDebts(filteredDebts, sortField, sortOrder);
      setFilteredDebts(sortedFilteredDebts);
    }
  };

  //notes
  //todo dodać rwd
  //todo sprawdzenie czy dziala na innych przegladarkach
  //todo dodac testy
  //todo textalig h header do usunieacia
  //
  return (
    <div className={'Container'}>
      <table className={'Table'}>
        <TableHead handleSorting={handleSorting} />
        <TableBody tableData={showedDebts} isLoading={isLoading} />
      </table>
    </div>
  );
};

export default Table;
