import { ChangeEvent, FC, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { ModelingWithFields } from "../../modules/Mock.tsx";
import './UpdateRequestCard.css'

interface Props {
    modeling: ModelingWithFields
    handleDelete: (id: number) => void
    handleUpdate: (id: number, node: string, queue: string, client: string) => void
    isDraft: boolean
}


const UpdateRequestCard: FC<Props> = ({modeling, handleDelete, handleUpdate, isDraft}) => {
    const [node, setNode] = useState<string>(modeling.nodeQuantity)
    const [queue, setQueue] = useState<string>(modeling.queueSize)
    const [client, setClient] = useState<string>(modeling.clientQuantity)

    const handleNodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNode(value);
    };

    const handleQueueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQueue(value);
    };

    const handleClientChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient(value);
    };

  return (
    <Card className="update-card"
              >
                <Card.Img
                  className="up-card__image"
                  src={modeling.image || '/default.webp'}
                ></Card.Img>
                <Card.Body className="up-card__content">
                  <h3 className="card__name">{modeling.name}</h3>
                  <h4 className="card_description"> {modeling.price} руб</h4>
                </Card.Body>
                {isDraft ? (
                  <div className="other">
                    <div className="left-column">
                      <label htmlFor="price">Количество узлов в сети</label>
                    </div>
                    <input
                    type='text'
                      id="price"
                      name="price"
                      value={node}
                      className="custom-input"
                      onChange={handleNodeChange}
                      required
                    />
                    <div className="left-column">
                      <label htmlFor="price">Размер очереди одного узла</label>
                    </div>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={queue}
                      onChange={handleQueueChange}
                      className="custom-input"
                      required
                    />
                    <div className="left-column">
                      <label htmlFor="price">Количество клиентов</label>
                    </div>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={client}
                      onChange={handleClientChange}
                      className="custom-input"
                      required
                    />
                    <div className="btns"><button
                      style={{
                        width: "200px",
                        backgroundColor: "rgb(46, 44, 44, 0.6)",
                        fontSize: "1.25em",
                      }}
                      className="search-button cart-button"
                      onClick={() => handleDelete(modeling.modelingId)}
                    >
                      Удалить
                    </button>
                    <button
                      style={{
                        width: "200px",
                        backgroundColor: "rgb(46, 44, 44, 0.6)",
                        fontSize: "1.25em",
                      }}
                      className="search-button cart-button"
                      onClick={() => handleUpdate(modeling.modelingId, node, queue, client)}
                    >
                      Изменить
                    </button>
                    </div>
                    
                  </div>
                ) : (
                  <div></div>
                )}
              </Card>
  );
};

export default UpdateRequestCard;
