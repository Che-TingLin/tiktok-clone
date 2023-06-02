import ReactPlayer from 'react-player';

function App() {
  return (
    <div className="App">
      <ReactPlayer
        url="http://localhost:3001/media/Audi_A4_S4.m3u8"
        playing
        controls
        width="100%"
        height="100%"
        config={{
          file: {
            forceHLS: true,
          },
        }}
      />
    </div>
  );
}

export default App;
