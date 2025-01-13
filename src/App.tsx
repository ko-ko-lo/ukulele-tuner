// import * as Tone from "tone";
import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/500.css";
import "@fontsource/comfortaa/600.css";
import "@fontsource/comfortaa/700.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./index.scss";
import AutoTuner from "./pages/AutoTuner";
import ManualTuner from "./pages/ManualTuner";
import "./styles/variables.scss";

/*function App() {
  const playNote = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ukulele Tuner</h1>
      <p>Click the button to play a test sound using Tone.js!</p>
      <button onClick={playNote}>Play Test Note</button>
    </div>
  );
}
*/
const App = () => {
  return (
    <Router>
      <Header /> {/* Header is always displayed */}
      <Routes>
        <Route path="/" element={<AutoTuner />} />
        <Route path="/manual" element={<ManualTuner />} />
      </Routes>
    </Router>
  );
};

export default App;
