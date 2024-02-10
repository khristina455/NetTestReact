import { FC, useState } from 'react'
import './PriceFilter.css'

export interface Prices {
    priceMin: number,
    priceMax: number,
    priceMinAbsolute: number,
    priceMaxAbsolute: number
}


interface Props {
    min: number
    max: number
    setFilter: (minVal:number, maxVal:number) => void
}

export const PriceFilter: FC<Props> = ({min, max, setFilter}) => {
    const [minValue, setMinValue] = useState(min)
    const [maxValue, setMaxValue] = useState(max)

    const handleMinChange = (newValue: number) => {
        setMinValue(newValue)
    }

    const handleMaxChange = (newValue: number) => {
        setMaxValue(newValue)
    }

    const handleClick = () => {
        setFilter(minValue, maxValue)
    }

    return (
        <div>
            <h3>Фильтр по цене</h3>
            <div className='filter__input'>
                <input className='filter__min' placeholder="От" value={minValue === 0 ? '' : minValue} onChange={(event => handleMinChange(Number(event.target.value)))}></input>
                <input className='filter__max' placeholder="До" value={maxValue === 100000000 ? '' : maxValue} onChange={(event => handleMaxChange(Number(event.target.value)))}></input>
                <button className='filter__button' onClick={handleClick}>Применить</button>
            </div>
        </div>
    )
}
