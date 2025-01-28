// import * as Tone from "tone";
import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/500.css";
import "@fontsource/comfortaa/600.css";
import "@fontsource/comfortaa/700.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.scss";
import AutoTuner from "./pages/AutoTuner";
import ManualTuner from "./pages/ManualTuner";
import "./styles/variables.scss";

const App = () => {
  return (
    <div id="root">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<AutoTuner />} />
            <Route path="/manual" element={<ManualTuner />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
