import { FC, useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar';
import Table from '../../Components/Table';
import { DebtApi } from '../../Services/Api/interfaces';
import { getTopDebts } from '../../Services/Api';

const Home: FC = () => {
  return (
    <div>
      <SearchBar />
      <Table />
    </div>
  );
};

export default Home;
