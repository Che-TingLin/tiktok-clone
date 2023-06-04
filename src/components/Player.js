import { useEffect } from 'react';

import ReactPlayer from 'react-player';
import Hls from 'hls.js';

import classes from './Player.module.scss';

const Player = (props) => {
  const { url, playerRef, type, cacheTime, setCacheTime } = props;

  useEffect(() => {
    let timer;
    if (cacheTime[type]) {
      window.setTimeout(() => {
        playerRef.current.seekTo(cacheTime[type]);
        setCacheTime((prev) => ({ ...prev, [type]: 0 }));
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [type, cacheTime, playerRef, setCacheTime]);

  return (
    <>
      <ReactPlayer
        ref={playerRef}
        className={classes.player}
        url={url}
        controls
        playing
        muted
        loop
        width="100%"
        height="100vh"
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
