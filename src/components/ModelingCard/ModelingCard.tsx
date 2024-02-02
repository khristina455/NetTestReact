import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import './ModelingCard.css'
import { useAuth } from '../../hooks/useAuth'
import { api } from "../../api/index";

interface Props {
    modelingId: number
    name: string
    description: string
    image: string
    price: number
    isSingleCard: boolean
}

const ModelingCard: FC<Props> = ({modelingId, name, description, image, price, isSingleCard}) => {
    const { is_authenticated, resetUser } = useAuth();
    return (
    <Card className='card' >
        <Card.Img className='card__image' src={image || '/default.webp'} />
        <Card.Body className='card__content'>                
            <h3 className='card__name' key={modelingId}><Card.Title>{name}</Card.Title></h3>
            <div className='card__description'> {description}</div>
            <div className='card__price'>{price}₽</div>
            <button
                      style={{
                        width: "200px",
                        backgroundColor: "rgb(46, 44, 44, 0.6)",
                        fontSize: "1.25em",
                      }}
                      className={`search-button ${!is_authenticated ? "" : "btn-more"}`}
                      onClick={async () => {
                        const response = await api.api.modelingsRequestCreate(
                          modelingId
                        );

                        if (response.status === 403) {
                          resetUser();
                        }

                      }}
                    >
                      Добавить в корзину
                    </button>
            {!isSingleCard && <Button href={'/modelings/' + modelingId} className='btn-more'>Подробнее</Button>}
        </Card.Body>
    </Card>
    )
    }

export default ModelingCard
