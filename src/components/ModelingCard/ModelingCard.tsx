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
    isSingleCard: boolean
}

const ModelingCard: FC<Props> = ({modelingId, name, description, image, price, isSingleCard}) => {
    return (
    <Card className='card' >
        <Card.Img className='card__image' src={image || '/NetTestReact/default.webp'} />
        <Card.Body className='card__content'>                
            <h3 className='card__name' key={modelingId}><Card.Title>{name}</Card.Title></h3>
            <div className='card__description'> {description}</div>
            <div className='card__price'>{price}₽</div>
            {!isSingleCard && <Button href={'/NetTestReact/modelings/' + modelingId} className='btn-more'>Подробнее</Button>}
        </Card.Body>
    </Card>
    )
    }

export default ModelingCard
