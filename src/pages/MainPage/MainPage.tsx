import { FC, useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import "./MainPage.css";
import { Modeling, mockModelings } from "../../modules/Mock";
import ModelingCard from "../../components/ModelingCard/ModelingCard";
import { PriceFilter } from "../../components/PriceFilter/PriceFilter";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/index";
import {
  setLowPrice,
  setHighPrice,
  setSearchValue,
} from "../../store/filterModelingsSlice";
import { useDispatch } from "react-redux";
import { useModelingsFilter } from "../../hooks/useModelingsFilter";

const MainPage: FC = () => {
  const [modelings, setModelings] = useState<Modeling[]>([]);
  const [draftId, setDraftId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    let draftId, modelings;
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
    console.log(draftId);
    setModelings(modelings);
    setDraftId(draftId);
  };

  const { lowPrice, highPrice, searchValue } = useModelingsFilter();

  useEffect(() => {
    handleSearch();
  }, [searchValue, lowPrice, highPrice]);

  const setFilter = (minVal: number, maxVal: number) => {
    dispatch(setLowPrice(minVal));
    dispatch(setHighPrice(maxVal));
  };

  const setSearch = (val: string) => {
    dispatch(setSearchValue(val));
  };

  const handleClick = async () => {
    navigate(`/requests/${draftId}`);
  };

  return (
    <div>
      <div className="bread-container">
        <Breadcrumbs pages={[]} />
      </div>
      <div className={`container`}>
        <div className="site-body">
          <button
            className={`search-button ${
              draftId == 0 ? "non-button" : "cart-button"
            }`}
            onClick={handleClick}
          >
            К корзине
          </button>
          <div className="filter">
            <PriceFilter min={lowPrice} max={highPrice} setFilter={setFilter} />
            <SearchInput value={searchValue} setValue={setSearch} />
          </div>
          <div className="cards-with-search">
            {!modelings.length && (
              <div style={{ paddingLeft: "2rem", paddingTop: "1rem" }}>
                <h2>К сожалению, по вашему запросу ничего не найдено</h2>
              </div>
            )}
            <div className="cards-list">
              {modelings.map((item) => (
                <ModelingCard
                  modelingId={item.modelingId}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  price={item.price}
                  isSingleCard={false}
                  handleSearch={handleSearch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
