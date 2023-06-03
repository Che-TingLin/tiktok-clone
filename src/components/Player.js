import ReactPlayer from 'react-player';
import Hls from 'hls.js';

const Player = (props) => {
  const { url } = props;

  return (
    <>
      <ReactPlayer
        url={url}
        controls
        playing
        muted
        loop
        width="100%"
        height="100%"
        config={{
          file: {
            forceHLS: Hls.isSupported(),
          },
        }}
      />
    </>
  );
};

export default Player;
