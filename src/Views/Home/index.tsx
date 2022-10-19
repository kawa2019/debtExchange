import { FC, useCallback, useState } from 'react';
import SearchBar from '../../Components/SearchBar';
import Table from '../../Components/Table';

const Home: FC = () => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  //TODO remove all files

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <Table search={search} />
    </div>
  );
};

export default Home;
