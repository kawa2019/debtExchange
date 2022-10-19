import { FC, useState } from 'react';
import { DebtApiKey } from '../../../Services/Api/interfaces';

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

  return (
    <thead>
      <tr>
        <th>
          <div onClick={() => handleSortingChange('Name')}>Dłużnik</div>
        </th>
        <th>
          <div onClick={() => handleSortingChange('NIP')}>NIP</div>
        </th>
        <th>
          <div onClick={() => handleSortingChange('Value')}>Kwota zadłużenia</div>
        </th>
        <th>
          <div onClick={() => handleSortingChange('Date')}>Data powstania zobowiązania</div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
