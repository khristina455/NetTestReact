import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import './ModelingCard.css'

interface Props {
    modelingId: number
    name: string
    description: string
    image: string
    price: number
}

const ModelingCard: FC<Props> = ({modelingId, name, description, image, price}) => {
    return (
    <Card className='card' >
        <Card.Img className='card__image' src={image} />
        <Card.Body className='card__content'>                
            <h3 className='card__name' key={modelingId}><Card.Title>{name}</Card.Title></h3>
            <div className='card__description'> {description}</div>
            <div className='card__price'>{price}₽</div>
            <Button href={'/modelings/' + modelingId} className='btn-more'>Подробнее</Button>
        </Card.Body>
    </Card>
    )
    }

export default ModelingCard
