import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CartPage from "../CartPage/CartPage.jsx";
import AllProductPage from "../AllProductPage/AllProductpage.jsx";
import DogPage from "../DogPage/DogPage.jsx";
import CatPage from "../CatPage/CatPage.jsx";
import LoginPage from "../LoginPage/LoginPage.jsx";
import RegisterPage from "../RegisterPage/RegisterPage.jsx";
import CheckoutPage from "../CheckoutPage/CheckoutPage.jsx";
import PrivateRoute from "../../components/PrivateRoute.jsx";
import PlaceOrderPage from "../PlaceOrderPage/PlaceOrderPage.jsx";
import ProcessPaymentPage from "../ProcessPaymentPage/ProcessPaymentPage.jsx";
import MyOrdersPage from "../MyOrdersPage/MyOrdersPage.jsx";

function App() {
  return (
    <>
      <Container>
        <NavBar />
      </Container>
      <ToastContainer />
      <main className="py-3">
        <Container>
          <Routes>
            {/* go to url */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<AllProductPage />} />
            <Route path="/dogs" element={<DogPage />} />
            <Route path="/cats" element={<CatPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/orders/:id" element={<ProcessPaymentPage />} />

            {/* private route to define path */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/myorders" element={<MyOrdersPage />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
