import { FC, useEffect, useState} from "react"
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useStore } from "react-redux";
import InputField from "../../components/SearchInput/SearchInput";
import { useQuery } from "react-query";
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OrderTable from '../../components/OrdersTable/OrdersTable';
import FilterOrderStatus from '../../components/StatusFilter/StatusFilter';
import { api } from '../../api/index'
import DateFilter from "../../components/DateFilter/DateFilter";
import { ModelsAnalysisRequest } from "../../api/Api.ts";
import {
    setEndDate,
    setStartDate,
    setStatusFilter,
} from "../../store/filterRequetsSlice.ts";
import { useRequestsFilter } from "../../hooks/useRequestsFilter.ts";
import "./RequestsPage.css"


export type Filter = {
    Canceled: boolean;
    Accepted: boolean;
    Formated: boolean;
}


const RequestsPage: FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { is_authenticated, resetUser, is_moderator } = useAuth()
    const [response, setResponse] = useState<ModelsAnalysisRequest[]>()
    const { canceled, formated, accepted, startDateState, endDateState } = useRequestsFilter();
    const [filter, setFilter] = useState({ Accepted: accepted, Canceled: canceled, Formated: formated })
    //@ts-ignore
    const [login, setLogin] = useState<string>(useStore().getState().filterRequest.login)
    const dispatch = useDispatch();

    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter)
        dispatch(setStatusFilter(newFilter));
    };

    const handleStartDateChange = (date: Date) => {
        dispatch(setStartDate(date));
    }

    const handleEndDateChange = (date: Date) => {
        dispatch(setEndDate(date));
    }

    const getFilterStatusParams = () => {
        if (filter.Canceled) {
            return 'CANCELED'
        }
        if (filter.Accepted) {
            return 'COMPLETE'
        }
        if (filter.Formated) {
            return 'REGISTERED'
        }
        return ''
    }

    const filterByUsername = (orders: ModelsAnalysisRequest[], loginFilter: string) => {
        console.log('фильтрую по', loginFilter)
        if (loginFilter == undefined || loginFilter == "") {
            return orders
        }
        return orders.filter((order) => {
            return order.user?.toLowerCase().includes(loginFilter.toLowerCase())
        })
    }

    const processStatusUpdate = async (requestId: number | undefined, newStatus: 'COMPLETE' | 'CANCELED') => {
        try {
            const id: number = requestId ? requestId : 0
            const status: ModelsAnalysisRequest = { status: newStatus }
            await api.api.analysisRequestsAdminUpdate(id, status)
        } catch {
            console.log("Что-то пошло не так")
        }
    }

    const getRequests = async () => {
        const response = await api.api.analysisRequestsList({ status: getFilterStatusParams(), start_date: startDateState ? startDateState.toISOString().replace(/T/, ' ').replace(/\..+/, '') : "", end_date: endDateState ? endDateState.toISOString().replace(/T/, ' ').replace(/\..+/, '') : "" })
        if (response.status == 200) {
            setResponse(filterByUsername(response.data, login))
        }

        if (response.status == 403) {
            resetUser()
        }
    }

    useQuery('monitoring-requests', getRequests, { refetchInterval: 3000 });

    useEffect(() => {
        getRequests().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [filter, login])

    if (!is_authenticated && !loading) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Войдите в аккаунт, чтобы посмотреть список заказов</h1>
            </Container>
        )
    }

    return (
            <div className="site-body">
                <Container style={{ width: "100%" }}>
                    <Row>
                        <Breadcrumbs pages={[{ link: `/requests`, title: `Мои заявки` }]} />
                    </Row>
                    <Row style={{ display: "flex", flexDirection: "row", marginTop: "20px", gap: "10rem"}}>
                        <Col>
                            <DateFilter
                                startDate={startDateState}
                                setStartDate={handleStartDateChange}
                                endDate={endDateState}
                                setEndDate={handleEndDateChange}
                                send={getRequests}
                            />
                        </Col>
                        <Col>
                            <FilterOrderStatus state={filter} handleFilterChange={handleFilterChange} />
                        </Col>
                        {is_moderator && <Col className="search-login">
                            <div>Логин пользователя:</div>
                            <div>
                                <InputField
                                    value={login}
                                    setValue={
                                        setLogin
                                    }
                                />
                            </div>
                        </Col>}

                    </Row>

                    <Row>
                        <OrderTable orders={response} is_moderator={is_moderator} processStatusUpdate={processStatusUpdate} />
                    </Row>
                </Container>
            </div>
    )
}

export default RequestsPage