import { ChangeEvent, FC, SyntheticEvent, useCallback, useState } from 'react';
import './index.sass';

interface SearchBarProps {
  handleSearch: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {
  const [localSearch, setLocalSearch] = useState<string>('');

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

  //TOOD adding normalnize css

  return (
    <header className={'SearchBar'}>
      <form onSubmit={handleSubmit} className={'SearchBar-Form Container'}>
        <label className={'SearchBar-Label'}>Podaj nip lub nazwę dłużnika</label>
        <div>
          <input
            value={localSearch}
            onChange={handleLocalSearch}
            minLength={4}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Minimum 4 znaki')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            className={'SearchBar-Input'}
          />
          <button type={'submit'} className={'SearchBar-Submit'}>
            Szukaj
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
