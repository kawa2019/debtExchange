import { FC, useEffect, useMemo, useState } from 'react';
import { DebtApi, DebtApiKey } from '../../Services/Api/interfaces';
import { getFilteredDebts, getTopDebts } from '../../Services/Api';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './index.sass';
import { getSortedDebts } from '../../Services/Table';
import { Order } from '../../Services/Table/interfaces';

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

  const handleSorting = (sortField: DebtApiKey, sortOrder: Order) => {
    const sortedTopDebts = getSortedDebts(topDebts, sortField, sortOrder);
    setTopDebts(sortedTopDebts);

    if (filteredDebts) {
      const sortedFilteredDebts = getSortedDebts(filteredDebts, sortField, sortOrder);
      setFilteredDebts(sortedFilteredDebts);
    }
  };

  return (
    <div className={'Container TableContainer'}>
      <table className={'Table'}>
        <TableHead handleSorting={handleSorting} />
        <TableBody tableData={showedDebts} isLoading={isLoading} />
      </table>
    </div>
  );
};

export default Table;
