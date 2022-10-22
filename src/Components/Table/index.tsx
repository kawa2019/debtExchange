import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {DebtApi, DebtApiKey} from '../../Services/Api/interfaces';
import {getFilteredDebts, getTopDebts} from '../../Services/Api';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './index.sass';
import {defaultOrder, defaultSortField, getSortedDebts} from '../../Services/Table';
import {Order} from '../../Services/Table/interfaces';

interface TableProps {
    search: string;
    isLoading: boolean;
    handleIsLoading: (value: boolean) => void;
}

const Table: FC<TableProps> = ({search, isLoading, handleIsLoading}) => {
    const [topDebts, setTopDebts] = useState<DebtApi[]>([]);
    const [filteredDebts, setFilteredDebts] = useState<DebtApi[] | null>(null);
    const [sortField, setSortField] = useState<DebtApiKey>(defaultSortField);
    const [order, setOrder] = useState<Order>(defaultOrder);

    useEffect(() => {
        (async () => {
            handleIsLoading(true);
            const result = await getTopDebts();
            const sortedResult = getSortedDebts(result, sortField, order);
            setTopDebts(sortedResult);
            handleIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (search) {
            (async () => {
                handleIsLoading(true);
                const body = {data: search};
                const result = await getFilteredDebts(body);
                const sortedResult = getSortedDebts(result, sortField, order);
                setFilteredDebts(sortedResult);
                handleIsLoading(false);
            })();
        }
    }, [search]);

    const showedDebts = useMemo(() => {
        return search.length > 3 && filteredDebts ? filteredDebts : topDebts;
    }, [search, filteredDebts, topDebts]);

    const handleSorting = useCallback((sortField: DebtApiKey, sortOrder: Order) => {
        const sortedTopDebts = getSortedDebts(topDebts, sortField, sortOrder);
        setTopDebts(sortedTopDebts);

        if (filteredDebts) {
            const sortedFilteredDebts = getSortedDebts(filteredDebts, sortField, sortOrder);
            setFilteredDebts(sortedFilteredDebts);
        }
    }, [topDebts, filteredDebts]);

    const handleSortingChange = useCallback((accessor: DebtApiKey) => {
        const sortOrder = order === 'asc' ? 'desc' : 'asc';
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    }, [order, sortField, handleSorting]);

    return (
        <div className={'Container TableContainer'}>
            <table className={'Table'}>
                <TableHead handleSortingChange={handleSortingChange} sortField={sortField} order={order}/>
                <TableBody tableData={showedDebts} isLoading={isLoading}/>
            </table>
        </div>
    );
};

export default Table;
