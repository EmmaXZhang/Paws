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
import Admin from "../../components/Admin.jsx";
import OrderListPage from "../OrderListPage/OrderListPage.jsx";
import ProductListPage from "../ProductListPage/ProductListPage.jsx";
import BedsPage from "../BedsPage/BedsPage.jsx";
import TowersPage from "../TowersPage/TowersPage.jsx";

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
            <Route path="/products/beds" element={<BedsPage />} />
            <Route path="/products/towers" element={<TowersPage />} />
            <Route path="/dogs" element={<DogPage />} />
            <Route path="/cats" element={<CatPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* private route to define path */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/orders/myorders" element={<MyOrdersPage />} />
            </Route>

            <Route path="/orders/:id" element={<ProcessPaymentPage />} />

            {/* admin */}
            <Route path="" element={<Admin />}>
              <Route path="/admin/orderlist" element={<OrderListPage />} />
              <Route path="/admin/productlist" element={<ProductListPage />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
