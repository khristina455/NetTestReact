import { FC, useState, ChangeEvent } from "react";
import "./SearchInput.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

const SearchInput: FC<Props> = ({ value, setValue, placeholder }) => {
    const [searchVal, setSearchVal] = useState(value)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.target.value)
    }

    const handleClick = () => {
        setValue(searchVal)
    }

    return(<div className="search">
    <h3 className="search__title">Поиск</h3>
    <input
      value={searchVal}
      className="search-bar"
      placeholder={placeholder}
      onChange={handleChange}
    />
    <button className="search__button" onClick={handleClick}>Поиск</button>
  </div>)
}
  

export default SearchInput;
