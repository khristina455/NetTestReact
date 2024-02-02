import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./OrdersTable.css"
import { ModelsAnalysisRequest } from '../../api/Api'
import { Link } from 'react-router-dom'

interface Props {
    orders: ModelsAnalysisRequest[] | undefined
    is_moderator: boolean
    processStatusUpdate: (requestId: number | undefined, newStatus: 'COMPLETE' | 'CANCELED') => Promise<any>
}

const getStatus = (status: string | undefined) => {
    if (status === "COMPLETE") {
        return "завершена"
    }
    if (status === "CANCELED") {
        return "отклонена"
    }
    if (status === "IN WORK") {
        return "принята"
    }
    return "сформирована"
}

const getDate = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.toLocaleDateString('ru')} ${dateObj.toLocaleTimeString('ru')}`;
}



const OrderTable: FC<Props> = ({ orders, is_moderator, processStatusUpdate }) => {
    return (
        <div>
            {is_moderator ? <Container id="order-table" style={{ marginTop: "20px", marginBottom: "50px", marginLeft: "-30px" ,width: "105%" }}>
                <Row className="order-table-header" style={{ display: "flex", padding: "15px" }}>
                    <Col className="order-table-head" style={{ width: "8%" }}><h2>Номер</h2></Col>
                    <Col className="order-table-head" style={{ width: "14%" }}><h2>Пользователь</h2></Col>
                    <Col className="order-table-head" style={{ width: "12%" }}><h2>Дата создания</h2></Col>
                    <Col className="order-table-head" style={{ width: "12%"     }}><h2>Дата отправки</h2></Col>
                    <Col className="order-table-head" style={{ width: "12%" }}><h2>Дата завершения</h2></Col>
                    <Col className="order-table-head" style={{ width: "12%" }}><h2>Статус</h2></Col>
                    <Col className="order-table-head" style={{ width: "10%" }}><h2>Модератор</h2></Col>
                    <Col className="order-table-head" style={{ width: "14%"}}><h2>Действия</h2></Col>
                </Row>
                {orders?.map((order, index) => (
                    <Row className="order-table-row" key={index} style={{ display: "flex", padding: "15px",  borderTop: "2px groove black" }}>
                        <Col className="order-table-col" style={{ width: "8%" }}><h2>{order.requestId}</h2></Col>
                        <Col className="order-table-col" style={{ width: "14%" }}><h2>{order.user}</h2></Col>
                        <Col className="order-table-col" style={{ width: "12%" }}><h2>{getDate(order.creationDate ? order.creationDate : "")}</h2></Col>
                        <Col className="order-table-col" style={{ width: "12%" }}><h2>{getDate(order.formationDate ? order.formationDate : "")}</h2></Col>
                        <Col className="order-table-col" style={{ width: "12%" }}><h2>{getDate(order.completeDate ? order.completeDate : "") == "01.01.1 02:30:17" ? "-" : getDate(order.completeDate ? order.completeDate : "") }</h2></Col>
                        <Col className="order-table-col" style={{ width: "12%" }}><h2>{getStatus(order.status)}</h2></Col>
                        <Col className="order-table-col" style={{ width: "10%" }}><h2>{order.admin}</h2></Col>
                        <Col className="order-table-col" style={{ width: "14%", display: "flex", flexDirection: "column" }}>
                            <Link to={`/requests/${order.requestId}`}><h2>Посмотреть</h2></Link>  
                            {order.status == 'REGISTERED' &&
                                <div style={{ display: "flex" }}>
                                    <button className="accept-button" onClick={() => processStatusUpdate(order.requestId, 'COMPLETE')}>Принять</button>
                                    <button className="reject-button" onClick={() => processStatusUpdate(order.requestId, 'CANCELED')}>Отклонить</button>
                                </div>}
                        </Col>  
                    </Row>
                ))}
            </Container> : <Container id="order-table" style={{ marginTop: "20px", marginBottom: "50px", width: "100%", position: "relative" }}>
                <Row className="order-table-header" style={{ display: "flex", padding: "15px" }}>
                    <Col className="order-table-head" style={{ width: "17%" }}><h2>Номер</h2></Col>
                    <Col className="order-table-head" style={{ width: "17%" }}><h2>Дата создания</h2></Col>
                    <Col className="order-table-head" style={{ width: "17%" }}><h2>Дата отправки</h2></Col>
                    <Col className="order-table-head" style={{ width: "17%" }}><h2>Дата завершения</h2></Col>
                    <Col className="order-table-head" style={{ width: "17%" }}><h2>Статус</h2></Col>
                    <Col className="order-table-head" style={{ width: "17%" }}><h2>Модератор</h2></Col>
                    <Col className="order-table-head" style={{ width: "17%" }}><h2>Ссылка</h2></Col>
                </Row>
                {orders?.map((order) => (
                    <Row className="order-table-row" key={order.requestId} style={{ display: "flex", padding: "15px", backgroundColor: "#212121", borderTop: "2px groove black" }}>
                        <Col className="order-table-col" style={{ width: "17%" }}><h2>{order.requestId}</h2></Col>
                        <Col className="order-table-col" style={{ width: "17%" }}><h2>{getDate(order.creationDate ? order.creationDate : "")}</h2></Col>
                        <Col className="order-table-col" style={{ width: "17%" }}><h2>{getDate(order.formationDate ? order.formationDate : "")}</h2></Col>
                        <Col className="order-table-col" style={{ width: "17%" }}><h2>{getDate(order.completeDate ? order.completeDate : "") == "01.01.1 02:30:17" ? "-" : getDate(order.completeDate ? order.completeDate : "") }</h2></Col>
                        <Col className="order-table-col" style={{ width: "17%" }}><h2>{getStatus(order.status)}</h2></Col>
                        <Col className="order-table-col" style={{ width: "17%" }}><h2>{order.admin}</h2></Col>
                        <Col className="order-table-col" style={{ width: "17%" }}><Link to={`/requests/${order.requestId}`}><h2>Посмотреть</h2></Link></Col>
                    </Row>
                ))}
            </Container>
            }
        </div>

    )
}

export default OrderTable;
