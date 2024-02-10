import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../../../public/default.webp'
import "./ModelingsTable.css"
import ImageWrapper from '../ImageWrapper/ImageWrapper'


interface ModelingsTableItem {
    modelingId: number,
    title: string,
    price: number,
    count: number,
    isDeleted: boolean,
    image: string
}

interface Props {
    products: ModelingsTableItem[]
}

const ModelingsTable: FC<Props> = ({ products }) => {
    const navigate = useNavigate()

    return (
        <Container id="product-table" style={{ marginTop: "30px", marginBottom: "50px", width: "100%" }}>
            <Row className="product-table-header" style={{ display: "flex", padding: "15px" }}>
                <Col className="product-table-head" style={{ width: "24%" }}><h2>Название</h2></Col>
                <Col className="product-table-head" style={{ width: "20%" }}><h2>Цена</h2></Col>
                <Col className="product-table-head" style={{ width: "34%" }}><h2>Картинка</h2></Col>
                <Col className="product-table-head" style={{ width: "20%" }}><h2>Действия</h2></Col>
            </Row>
            {products.map((product, index) => (
                <Row className="product-table-row" key={index} style={{ display: "flex", padding: "15px", borderTop: "2px groove black" }}>
                    <Col className="product-table-col" style={{ width: "24%" }}><h2>{product.title}</h2></Col>
                    <Col className="product-table-col" style={{ width: "20%" }}><h2>{product.price} ₽</h2></Col>
                    <Col className="product-table-col" style={{ width: "34%" }}><div><ImageWrapper className="product-table-image" src={product.image} based="/default.webp" /></div></Col>
                    <Col className="product-table-col" style={{ width: "20%", display: "flex", flexDirection: "column" }}>
                        {product.isDeleted ? <div></div> : <Link to={`/modelings/${product.modelingId}`}><h2>Посмотреть</h2></Link>}
                        <button className="search-button cart-button update-button"
                            onClick={() => navigate(`/modelings/update/${product.modelingId}`)}>Изменить</button>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default ModelingsTable;