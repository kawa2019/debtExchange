import { FC, useCallback, useState } from 'react';
import SearchBar from '../../Components/SearchBar';
import Table from '../../Components/Table';

const Home: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleIsLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  //TODO remove all files

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <Table search={search} isLoading={isLoading} handleIsLoading={handleIsLoading} />
    </div>
  );
};

export default Home;
