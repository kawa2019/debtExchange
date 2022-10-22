import { ChangeEvent, FC, SyntheticEvent, useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './index.sass';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  handleSearch: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {
  const [localSearch, setLocalSearch] = useState<string>('');
  const isMobileView = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const handleLocalSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setLocalSearch(newSearch);
  }, []);

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      handleSearch(localSearch);
    },
    [handleSearch, localSearch],
  );

  return (
    <header className={'SearchBar'}>
      <form onSubmit={handleSubmit} className={'SearchBar-Form Container'}>
        <label className={'SearchBar-Label'}>Podaj nip lub nazwę dłużnika</label>
        <div className={'SearchBar-ContainerBar'}>
          <input
            value={localSearch}
            onChange={handleLocalSearch}
            minLength={4}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Minimum 4 znaki')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            className={'SearchBar-Input'}
          />
          <button type={'submit'} className={'SearchBar-Submit'}>
            {isMobileView ? <FaSearch size={24} /> : 'Szukaj'}
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
