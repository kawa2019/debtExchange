import {DebtApi} from '../../../Services/Api/interfaces';
import {FC, useCallback} from 'react';
import format from 'date-fns/format';
import './index.sass';
import Loader from '../../Loader';

interface TableBodyProps {
    tableData: DebtApi[];
    isLoading: boolean;
}

const TableBody: FC<TableBodyProps> = ({tableData, isLoading}) => {
    const getFormattedDate = useCallback((date: string) => {
        const dateObj = new Date(date);
        return format(dateObj, 'dd-MM-yyyy');
    }, []);

    return (
        <tbody className={'TableBody'}>
        {isLoading ? (
            <tr>
                <td colSpan={4} className={'TableBody-TableCell--loading'}>
                    <div className={'TableBody-LoaderWrapper'}>
                        <Loader/>
                    </div>
                </td>
            </tr>
        ) : null}
        {!isLoading && !tableData.length ? (
            <tr>
                <td colSpan={4} className={'TableBody-TableCell TableBody-TableCell--noData'}>
                    brak wpisów
                </td>
            </tr>
        ) : null}
        {!isLoading && tableData.length
            ? tableData.map((debt: DebtApi) => (
                <tr key={debt.Id}>
                    <td className={'TableBody-TableCell'}>{debt.Name}</td>
                    <td className={'TableBody-TableCell'}>{debt.NIP}</td>
                    <td className={'TableBody-TableCell'}>{debt.Value}</td>
                    <td className={'TableBody-TableCell'}>{getFormattedDate(debt.Date)}</td>
                </tr>
            ))
            : null}
        </tbody>
    );
};

export default TableBody;
