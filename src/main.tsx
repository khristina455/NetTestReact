import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import ModelingPage from "./pages/ModelingPage/ModelingPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignupPage from "./pages/SignupPage/SignupPage.tsx";
import RequestsPage from "./pages/RequestsPage/RequestsPage.tsx";
import RequestPage from "./pages/RequestPage/RequestPage.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Container>
            <Navbar />
            <Row>
              <Routes>
                <Route path="/" element={<Navigate to="/modelings" replace />} />
                <Route path="modelings/" element={<MainPage />} />
                <Route path="modelings/:modelingId" element={<ModelingPage />} />
                <Route path="login/" element={<LoginPage />} />
                <Route path="signup/" element={<SignupPage />} />
                <Route path="requests/" element={<RequestsPage />} />
                <Route path="requests/:requestId" element={<RequestPage />} />
              </Routes>
            </Row>
          </Container>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);