import * as Tone from "tone";
import "./styles/variables.scss";

function App() {
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

export default App;
