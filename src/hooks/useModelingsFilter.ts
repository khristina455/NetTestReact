import { useSelector } from 'react-redux';

export function useModelingsFilter() {
    //@ts-expect-error no need specify
    const searchValue = useSelector(state => state.filter.searchValue)
    //@ts-expect-error no need specify
    const lowPrice = useSelector(state => state.filter.lowPrice)
    ///@ts-expect-error no need specify
    const highPrice = useSelector(state => state.filter.highPrice)

    return {
        searchValue,
        lowPrice,
        highPrice,
    }
}
