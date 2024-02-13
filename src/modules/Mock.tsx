export interface Modeling {
    modelingId: number
    name: string
    description: string
    image: string
    price: number
}

export interface ModelingsList {
    modelings: Modeling[]
    draftId: number
}

export const mockModelings: Modeling[] = [
    {
        modelingId : 0,
        name : 'Аналитическое моделирование очереди в узле сети',
        description: 'Рассчет времени ожидания в узле сети',
        image: '',
        price: 50000,
    }, {
        modelingId: 1,
        name: 'Аналитическое моедлирование прохождения сообщения в сети',
        description: "Рассчет среденего времени прохождения сообщения в сети",
        image: '',
        price: 90000,
    }
]