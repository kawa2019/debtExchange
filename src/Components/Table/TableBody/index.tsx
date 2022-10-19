import { DebtApi } from '../../../Services/Api/interfaces';
import { FC } from 'react';

interface TableBodyProps {
  tableData: DebtApi[];
}

const TableBody: FC<TableBodyProps> = ({ tableData }) => {
  return (
    <tbody>
      {tableData.map((debt: DebtApi) => (
        <tr key={debt.Id}>
          <td>{debt.Name}</td>
          <td>{debt.NIP}</td>
          <td>{debt.Value}</td>
          <td>{debt.Date}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
