import { ChangeEvent, FC, useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/index";
import "./RequestPage.css";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ModelsAnalysisRequest } from "../../api/Api.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { ModelingWithFields } from "../../modules/Mock.tsx";
import UpdateRequestCard from "../../components/UpdateRequestCard/UpdateRequestCard.tsx";


interface formDataModeling {
  nodeQuantity: string
  queueSize: string
  clientQuantity: string
}

const convertToFormData = (nodeQuantity: string, queueSize: string, clientQuantity: string) => {
  const data: formDataModeling = { nodeQuantity: nodeQuantity, queueSize: queueSize, clientQuantity: clientQuantity }
  return data
}

const RequestPage: FC = () => {
  const [request, setRequest] = useState<ModelsAnalysisRequest>();
  const [modelings, setModelings] = useState<ModelingWithFields[]>([]);
  const navigate = useNavigate();
  const { resetUser } = useAuth();
  const { requestId } = useParams();

  const getData = async () => {
    console.log(requestId);
    const response = await api.api.analysisRequestsDetail(
      requestId ? +requestId : 1
    );
    if (response.status == 200) {
      console.log(response.data);
      setRequest(response.data.request);
      setModelings(response.data.modelings);
    }
    if (response.status == 403) {
      resetUser();
    }
  };

  useEffect(() => {
    getData()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteCard = async (id: number) => {
    const response =
      await api.api.analysisRequestsModelingsDelete(
        id
      );
    if (response.status == 200) {
      console.log(response.data);
      setModelings(response.data.modelings);
    }
  }

  const handleUpdateCard = async (id: number, nodeQuantity: string, queueSize: string, clientQuantity: string) => {
    const response =
      await api.api.analysisRequestsModelingsUpdate(
        id, convertToFormData(nodeQuantity, queueSize, clientQuantity)
      );
    if (response.status == 200) {
      console.log(response.data);
    }
  }


  return (
    <div className="site-body">
      <Container style={{ width: "100%" }}>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Col>
            <Breadcrumbs
              pages={[
                { link: `/requests`, title: `Мои заявки` },
                {
                  link: `/requests/${requestId}`,
                  title: `Заявка номер ${requestId}`,
                },
              ]}
            />
          </Col>
          <Col>
            {request?.status == "DRAFT" ? (
              <div>
                <button
                  style={{
                    width: "200px",
                    backgroundColor: "rgb(46, 44, 44, 0.6)",
                    fontSize: "1.25em",
                  }}
                  className="search-button cart-button"
                  onClick={async () => {
                    const response = await api.api.analysisRequestsDelete();
                    if (response.status == 200) {
                      console.log(response.data);
                      navigate("/modelings");
                    }
                  }}
                >
                  Удалить
                </button>
                <button
                  style={{
                    width: "200px",
                    backgroundColor: "rgb(46, 44, 44, 0.6)",
                    fontSize: "1.25em",
                    marginLeft: "10px",
                  }}
                  className="search-button cart-button"
                  onClick={async () => {
                    const response = await api.api.analysisRequestsClientUpdate(
                      { status: "REGISTERED" }
                    );
                    if (response.status == 200) {
                      console.log(response.data);
                      navigate("/requests");
                    }
                  }}
                >
                  Отправить заявку
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        <Row>
          <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap" }}>
            {modelings.map((item) => (
              <UpdateRequestCard modeling={item} handleDelete={handleDeleteCard} handleUpdate={handleUpdateCard} isDraft={request?.status == "DRAFT"}></UpdateRequestCard>
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default RequestPage;
