import { FC, useEffect, useState } from 'react';
import { DebtApi } from '../../Services/Api/interfaces';
import { getTopDebts } from '../../Services/Api';

const Table: FC = () => {
  const [topDebts, setTopDebts] = useState<DebtApi[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getTopDebts();
      setTopDebts(result);
    })();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Dłużnik</th>
          <th>NIP</th>
          <th>Kwota zadłużenia</th>
          <th>Data powstania zobowiązania</th>
        </tr>
      </thead>

      <tbody>
        {topDebts.map((debt: DebtApi) => (
          <tr>
            <td>{debt.Name}</td>
            <td>{debt.NIP}</td>
            <td>{debt.Value}</td>
            <td>{debt.Date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
