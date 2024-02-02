import { FC, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import SearchInput from '../../components/SearchInput/SearchInput'
import './MainPage.css'
import { Modeling, ModelingsList, mockModelings } from '../../modules/Mock'
import ModelingCard from '../../components/ModelingCard/ModelingCard'
import { PriceFilter } from '../../components/PriceFilter/PriceFilter'
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { useNavigate } from "react-router-dom";
import { api } from "../../api/index";


const filterMocks = (modelings: Modeling[], nameFilter: string, lowPrice: number, highPrice: number): Modeling[] => {
  return modelings.filter((modeling) => modeling.name.includes(nameFilter) && modeling.price <= highPrice && lowPrice >= lowPrice);
}

const getModelingsList = async (name = '', lowPrice: number, highPrice: number): Promise<ModelingsList> => {
  return fetch(`http://localhost:8080/api/modelings?query=${name}&from=${lowPrice}&to=${highPrice}`)
    .then((response) => response.json())
    .catch(() => ({ draftId: 0, modelings: filterMocks(mockModelings, name, lowPrice, highPrice) }))
}


const MainPage: FC = () => {
  const [modelings, setModelings] = useState<Modeling[]>([])
  const [draftId, setDraftId] = useState(0);
  const navigate = useNavigate()

  const handleSearch = async () => {
    setLoading(true)
    let draftId, modelings
    const response = await api.api.modelingsList({
      query: searchValue,
      from: lowPrice,
      to: highPrice,
    });
    if (response.status !== 200) {
      draftId = 0;
      modelings = mockModelings;
    }
    draftId = response.data.draftId ? response.data.draftId : 0;
    modelings = response.data.modelings;
    console.log(draftId)
    setModelings(modelings)
    setLoading(false)
    setDraftId(draftId);
  }

  const [searchValue, setSearchValue] = useState('')
  const [lowPrice, setLowPrice] = useState(0)
  const [highPrice, setHignPrice] = useState(100000)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleSearch();
  }, [searchValue, lowPrice, highPrice])


  const setFilter = (minVal: number, maxVal: number) => {
    setHignPrice(maxVal);
    setLowPrice(minVal);
  }

  const handleClick = async () => {
    navigate(`/requests/${draftId}`);
  };

  return (
    <div>
      <div>
        <Breadcrumbs pages={[]} />
      </div>
      <div className={`container ${loading && 'containerLoading'}`}>
        {loading && <div className="loadingBg"><Spinner animation="border" /></div>}
        <div className="site-body">
        <button
              style={{
                width: "200px",
                backgroundColor: "rgb(46, 44, 44, 0.6)",
                fontSize: "1.25em",
              }}
              className={`search-button ${draftId == 0 ? "" : "cart-button"}`}
              onClick={handleClick}
              disabled={draftId == 0}
            >
              К корзине
            </button>
          <div className='filter'>
            <PriceFilter min={1000} max={100000} setFilter={setFilter} />
            <SearchInput
              value={searchValue}
              setValue={(value) => setSearchValue(value)}
            />
          </div>
          <div className="cards-with-search">
            {!modelings.length && <div style={{paddingLeft:"2rem", paddingTop:"1rem"}}>
              <h2>К сожалению, по вашему запросу ничего не найдено</h2>
            </div>}
            <div className="cards-list">
              {modelings.map((item) => (
                <ModelingCard modelingId={item.modelingId} name={item.name} description={item.description} image={item.image} price={item.price} isSingleCard={false}/>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
