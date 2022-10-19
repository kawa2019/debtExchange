import { FC, useEffect, useMemo, useState } from 'react';
import { DebtApi, DebtApiKey } from '../../Services/Api/interfaces';
import { getFilteredDebts, getTopDebts } from '../../Services/Api';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './index.sass';

interface TableProps {
  search: string;
}

const Table: FC<TableProps> = ({ search }) => {
  const [topDebts, setTopDebts] = useState<DebtApi[]>([]);
  const [filteredDebts, setFilteredDebts] = useState<DebtApi[] | null>(null);
  const [sortSettings, setSortSettings] = useState({ column: 'Name', direction: 'up' });

  useEffect(() => {
    (async () => {
      const result = await getTopDebts();
      setTopDebts(result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (search) {
        const body = { data: search };
        const result = await getFilteredDebts(body);
        setFilteredDebts(result);
      }
    })();
  }, [search]);

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

  return (
    <div className={'Container'}>
      <table>
        <TableHead handleSorting={handleSorting} />
        <TableBody tableData={showedDebts} />
      </table>
    </div>
  );
};

export default Table;
