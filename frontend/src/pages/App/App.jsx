import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import HomePage from "../HomePage/HomePage";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <main className="py-3">
            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
