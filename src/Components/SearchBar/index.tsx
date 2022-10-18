import {FC} from "react";

const SearchBar: FC = () => {
    return (
        <div>
            <form>
                <label>Podaj nip lub nazwę dłużnika</label>
                <div>
                    <input/>
                    <button type={'submit'}>Szukaj</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar