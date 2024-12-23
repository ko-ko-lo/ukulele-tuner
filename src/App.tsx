import * as Tone from "tone";

function App() {
  const playNote = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ukulele Tuner</h1>
      <p>Click the button to play a test sound using Tone.js!</p>
      <button
        onClick={playNote}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Play Test Note
      </button>
    </div>
  );
}

export default App;
