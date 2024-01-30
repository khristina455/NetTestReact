import { FC, useEffect, useState } from 'react'
import {Card } from 'react-bootstrap'
import { Modeling, mockModelings } from '../../modules/Mock'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './ModelingPage.css'
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs'

const ModelingPage: FC = () => {
    const params = useParams();

    const [card, setCard] = useState<Modeling>(mockModelings[0]);

    const getModelingById = async (id: string): Promise<Modeling> =>{
        return fetch(`http://localhost:8080/modelings/${id}`)
            .then((response) => response.json())
            .catch(()=> (+id < mockModelings.length ? mockModelings[+id] : mockModelings[0]))
    }

    const fetchModeling = async() => {
        const modelingId:string = params.modelingId ? params.modelingId : '1'
        const modeling = await getModelingById(modelingId)
        setCard(modeling)
    }

    useEffect(() => {
       fetchModeling();
    }, [])

    return (
        <div>
        <Navbar />
        <div style={{marginLeft: "10%", marginTop: "20px"}}>
        <Breadcrumbs pages={[{link: `/modelings/${params.modelingId}`, title: `${card.name}`}]}/>
        </div>
        <div className="site-body">
            <Card className="card card-page">
                <Card.Body className="card__content">                
                    <h3 className="card__name" style={{color: "#00A88E"}}><Card.Title>{card.name}</Card.Title></h3>
                    <div className="card_description" style={{whiteSpace: "pre-wrap"}}> {card.description}</div>
                </Card.Body>
            <Card.Img className="card__image" src={card.image} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="../default.jpeg";
                        }}/>
            </Card>
        </div>
        </div>
    );
}

export default ModelingPage;
