// import * as Tone from "tone";
import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/500.css";
import "@fontsource/comfortaa/600.css";
import "@fontsource/comfortaa/700.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PageLayout } from "./layout/PageLayout";
import AutoTuner from "./pages/auto-tuner/AutoTuner";
import ManualTuner from "./pages/manual-tuner/ManualTuner";
import "./styles/index.scss";
import "./styles/variables.scss";

const App = () => {
  return (
    <div id="root">
      <Router>
        <PageLayout>
          <Routes>
            <Route path="/" element={<AutoTuner />} />
            <Route path="/manual" element={<ManualTuner />} />
          </Routes>
        </PageLayout>
      </Router>
    </div>
  );
};

export default App;
