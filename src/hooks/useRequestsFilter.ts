import { useSelector } from 'react-redux';

export function useRequestsFilter() {
    //@ts-expect-error no need specify
   const {canceled, formated, accepted, startDate, endDate} = useSelector(state => state.filterRequest);
   const startDateState: Date = new Date(startDate);
   const endDateState: Date = new Date(endDate);

   return {
       canceled,
       formated,
       accepted, 
       startDateState,
       endDateState
   }
}
