import { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ModelsModeling } from "../../api/Api.ts";
import { api } from "../../api/index";
import "./UpdateModelingPage.css";

const emptyModeling: ModelsModeling = {
  description: "",
  image: "",
  isDeleted: false,
  name: "",
  price: 0,
  modelingId: 0,
};

interface formDataModeling {
  image: File | undefined;
  name: string;
  description: string | undefined;
  price: string;
}

const convertToFormData = (
  values: ModelsModeling,
  image: File | undefined | null
) => {
  if (image) {
    const data: formDataModeling = {
      name: values.name ? "" + values.name : "",
      description: values.description,
      price: values.price ? "" + values.price : "0",
      image: image,
    };
    return data;
  }

  const data: formDataModeling = {
    name: values.name ? "" + values.name : "",
    description: values.description,
    price: values.price ? "" + values.price : "0",
    image: undefined,
  };
  return data;
};

const UpdateModelingPage: FC = () => {
  const modelingId = Number(useParams().modelingId);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { is_moderator } = useAuth();
  const pageTitle = modelingId
    ? "Изменение вида моделирования"
    : "Добавление вида моделирования";
  const [values, setValues] = useState<ModelsModeling>(emptyModeling);
  const [image, setImage] = useState<File | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string | undefined>();

  !is_moderator && navigate("/threats");

  const getModelingById = async () => {
    const response = await api.api.modelingsDetail(
      modelingId ? +modelingId : 1
    );
    if (response.status == 200) {
      setValues(response.data);
      setUploadedImage(response.data.image);
    }
  };

  useEffect(() => {
    if (modelingId) {
      getModelingById()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

    setLoading(false);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (modelingId) {
      try {
        const response = await api.api.modelingsUpdate(
          modelingId ? +modelingId : 1,
          convertToFormData(values, image)
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await api.api.modelingsCreate(
          convertToFormData(values, image)
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    navigate("/modelings/table");
  };

  return (
    <div className="site-body">
      <Container style={{ width: "100%" }}>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Breadcrumbs
            pages={[
              {
                link: "/modelings/table",
                title: "Таблица видов моделирования",
              },
              { link: window.location.pathname, title: pageTitle },
            ]}
          />
          <button
            style={{
              width: "200px",
              backgroundColor: "rgb(46, 44, 44, 0.6)",
              fontSize: "1.25em",
            }}
            className="search-button cart-button"
            onClick={async () => {
              await api.api.modelingsDelete(modelingId);
              navigate("/modelings/table");
            }}
          >
            Удалить услугу
          </button>
        </Row>
        <form onSubmit={handleSubmit}>
          <Container id="product-form" style={{ marginTop: "30px" }}>
            <Row style={{ display: "flex", width: "100%" }}>
              <Col id="product-form-main" style={{ width: "40%" }}>
                <Row>
                  <h2>Основные данные</h2>
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <div className="left-column">
                    <label htmlFor="name">Название*</label>
                  </div>
                  <textarea
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="custom-text"
                    required
                  />
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <div className="left-column">
                    <label htmlFor="description">Описание</label>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="custom-text"
                    style={{ height: "150px" }}
                  />
                </Row>
                <Row style={{ alignItems: "center" }}>
                  <div className="left-column">
                    <label htmlFor="price">Цена*</label>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={values.price}
                    className="custom-input"
                    onChange={handleChange}
                    required
                  />
                </Row>
                <Row>
                  <div className="left-column">
                    <label htmlFor="isDeleted">Статус</label>
                  </div>
                  <div style={{ marginLeft: "-17%" }}>
                    {values.isDeleted ? "Удалена" : "Доступна"}
                  </div>
                </Row>
              </Col>
              <Col id="product-form-image" style={{ width: "28%" }}>
                <Row>
                  <h2>Изображение</h2>
                </Row>
                <Row style={{ flexDirection: "column" }}>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    className="image-picker"
                    style={{ gap: "10px" }}
                  />
                  <div style={{ width: "80%" }}>
                    <img
                      src={uploadedImage}
                      alt=""
                      style={{
                        width: "100%",
                        border: "1px solid grey",
                        borderRadius: "10px",
                        marginTop: "30px",
                      }}
                    />
                  </div>
                </Row>
              </Col>
            </Row>
            <Row>
              <button id="product-form-submit-button" type="submit">
                Сохранить
              </button>
            </Row>
          </Container>
        </form>
      </Container>
    </div>
  );
};

export default UpdateModelingPage;
