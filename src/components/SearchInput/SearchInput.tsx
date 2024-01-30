import { FC } from 'react'
import './SearchInput.css'

interface Props {
    value: string
    setValue: (value: string) => void
    placeholder?: string
}

const SearchInput: FC<Props> = ({ value, setValue, placeholder}) => (
    <div className="search">
        <h3>Поиск</h3>
        <input value={value}  className="search-bar" placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
    </div>
)

export default SearchInput
