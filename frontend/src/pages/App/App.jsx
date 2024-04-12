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

function App() {
  return (
    <>
      <NavBar />
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
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
