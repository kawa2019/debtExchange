import {FC, useEffect, useState} from 'react';
import {DebtApiKey} from '../../../Services/Api/interfaces';
import './index.sass';
import OrderIcon from '../../OrderIcon';
import {Order} from '../../../Services/Table/interfaces';
import {defaultOrder, defaultSortField} from "../../../Services/Table";

interface TableHeadProps {
    handleSorting: (sortField: DebtApiKey, sortOrder: Order) => void;
}

const TableHead: FC<TableHeadProps> = ({handleSorting}) => {
    const [sortField, setSortField] = useState<DebtApiKey>(defaultSortField);
    const [order, setOrder] = useState<Order>(defaultOrder);

    const handleSortingChange = (accessor: DebtApiKey) => {
        const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
        <thead className={'TableHead'}>
        <tr>
            <th
                className={'TableHead-Th TableHead-Th--name'}
                onClick={() => handleSortingChange('Name')}>
                <div className={'TableHead-ColumnWrapper'}>
                    <p className={'TableHead-ColumnName'}>Dłużnik</p>
                    <OrderIcon sortField={sortField} field={'Name'} order={order}/>
                </div>
            </th>
            <th className={'TableHead-Th TableHead-Th--nip'} onClick={() => handleSortingChange('NIP')}>
                <div className={'TableHead-ColumnWrapper'}>
                    <p className={'TableHead-ColumnName'}>NIP</p>
                    <OrderIcon sortField={sortField} field={'NIP'} order={order}/>
                </div>
            </th>
            <th
                className={'TableHead-Th TableHead-Th--value'}
                onClick={() => handleSortingChange('Value')}>
                <div className={'TableHead-ColumnWrapper'}>
                    <p className={'TableHead-ColumnName'}>Kwota zadłużenia</p>
                    <OrderIcon sortField={sortField} field={'Value'} order={order}/>
                </div>
            </th>
            <th
                className={'TableHead-Th TableHead-Th--date'}
                onClick={() => handleSortingChange('Date')}>
                <div className={'TableHead-ColumnWrapper'}>
                    <p className={'TableHead-ColumnName'}>Data powstania zobowiązania</p>
                    <OrderIcon sortField={sortField} field={'Date'} order={order}/>
                </div>
            </th>
        </tr>
        </thead>
    );
};

export default TableHead;
