import { FC, useState } from 'react'
import './PriceFilter.css'

export interface Prices {
    priceMin: number,
    priceMax: number,
    priceMinAbsolute: number,
    priceMaxAbsolute: number
}

const MAX = 100000


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
        setFilter(newValue, maxValue)
      }

    const handleMaxChange = (newValue: number) => {
        setMaxValue(newValue)
        if (newValue == 0) {
            setFilter(minValue, MAX)
        } else {
            setFilter(minValue, newValue)
        }
      }

    return (
        <div>
            <h3>Фильтр по цене</h3>
            <div className='filter__input'>
                <input className='filter__min' placeholder="От" onChange={(event => handleMinChange(Number(event.target.value)))}></input>
                <input className='filter__max' placeholder="До" onChange={(event => handleMaxChange(Number(event.target.value)))}></input>
            </div>
        </div>
    )
}
