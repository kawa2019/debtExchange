import { FC, useMemo, useState } from 'react';
import { DebtApiKey } from '../../../Services/Api/interfaces';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import './index.sass';

interface TableHeadProps {
  handleSorting: (sortField: DebtApiKey, sortOrder: string) => void;
}

const TableHead: FC<TableHeadProps> = ({ handleSorting }) => {
  const [sortField, setSortField] = useState<DebtApiKey>('Name');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: DebtApiKey) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const orderIcon = useMemo(() => {
    return order === 'asc' ? (
      <TiArrowSortedDown className={'TableHead-OrderIcon'} size={16} />
    ) : (
      <TiArrowSortedUp className={'TableHead-OrderIcon'} size={16} />
    );
  }, [order]);

  return (
    <thead className={'TableHead'}>
      <tr>
        <th
          className={'TableHead-Th TableHead-Th--name'}
          onClick={() => handleSortingChange('Name')}>
          <div className={'TableHead-ColumnWrapper'}>
            Dłużnik
            {sortField === 'Name' && orderIcon}
          </div>
        </th>
        <th className={'TableHead-Th TableHead-Th--nip'} onClick={() => handleSortingChange('NIP')}>
          <div className={'TableHead-ColumnWrapper'}>
            NIP
            {sortField === 'NIP' && orderIcon}
          </div>
        </th>
        <th
          className={'TableHead-Th TableHead-Th--value'}
          onClick={() => handleSortingChange('Value')}>
          <div className={'TableHead-ColumnWrapper'}>
            Kwota zadłużenia
            {sortField === 'Value' && orderIcon}
          </div>
        </th>
        <th
          className={'TableHead-Th TableHead-Th--date'}
          onClick={() => handleSortingChange('Date')}>
          <div className={'TableHead-ColumnWrapper'}>
            Data powstania zobowiązania
            {sortField === 'Date' && orderIcon}
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
