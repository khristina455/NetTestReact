import { FC, useEffect, useState } from 'react'
import { Modeling, mockModelings } from '../../modules/Mock'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './ModelingPage.css'
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import ModelingCard from '../../components/ModelingCard/ModelingCard'

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
        <div>
        <Breadcrumbs pages={[{link: `/NetTestReact/modelings/${params.modelingId}`, title: `${card.name}`}]}/>
        </div>
        <div className="site-body">
            <div className='card-container'><ModelingCard modelingId={card.modelingId} name={card.name} description={card.description} image={card.image} price={card.price} isSingleCard={true}/></div>
        </div>
        </div>
    );
}

export default ModelingPage;
