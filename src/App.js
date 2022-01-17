// import { Actions } from "./Actions";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { DetailPage } from "./pages/DetailPage";
import { Contacts } from "./pages/Contacts";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import "materialize-css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const data = Actions();
  const history = createBrowserHistory();
  // Routing to navigate between pages + building a frame of App
  return (
    <>
      <Router history={history}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/home" exact element={<HomePage />}></Route>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
