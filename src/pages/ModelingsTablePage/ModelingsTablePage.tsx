import { FC, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ModelingsTable from "../../components/ModelingsTable/ModelingsTable";
import { useNavigate } from "react-router-dom";
import { ModelsModeling } from "../../api/Api";
import { api } from "../../api/index";

const ModelingsTablePage: FC = () => {
  const { is_moderator } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modelings, setModelings] = useState<ModelsModeling[]>([]);

  !is_moderator && navigate("/");

  const getAllModelings = async () => {
    const response = await api.api.modelingsList();
    setModelings(response.data.modelings);
  };

  useEffect(() => {
    getAllModelings()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const getTransformedData = (modelings: ModelsModeling[]) => {
    let result: any = [];
    modelings.map((modeling) => {
      result.push({
        modelingId: modeling.modelingId,
        title: modeling.name,
        price: modeling.price,
        deleted: modeling.isDeleted,
        image: modeling.image,
      });
    });
    return result;
  };

  return (
    <div className="site-body">
      <Container>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Breadcrumbs
            pages={[
              {
                link: `/modelings/table`,
                title: "Таблица видов моделирования",
              },
            ]}
          />
          <button
            style={{
              width: "200px",
              backgroundColor: "rgb(46, 44, 44, 0.6)",
              fontSize: "1.25em",
            }}
            className="search-button cart-button"
            onClick={() => {
              navigate("/modelings/update/0");
            }}
          >
            Добавить услугу
          </button>
        </Row>
        <Row style={{ display: "flex" }}>
          <ModelingsTable products={getTransformedData(modelings)} />
        </Row>
      </Container>
    </div>
  );
};

export default ModelingsTablePage;
