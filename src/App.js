import { useRef, useState, useCallback, useEffect } from 'react';

import ReactPlayer from 'react-player';

import useAxios from 'hooks/useAxios';
import api from 'api';

function App() {
  const effectRan = useRef(false);
  const { sendRequest } = useAxios();
  const [followingList, setFollowingList] = useState();

  const getFollowingList = useCallback(async () => {
    try {
      const { items } = await sendRequest(api.getFollowingList);
      setFollowingList(items);
    } catch (err) {
      console.error('getFollowingList', err);
    }
  }, [sendRequest]);

  useEffect(() => {
    if (effectRan.current) {
      getFollowingList();
    }
    return () => {
      effectRan.current = true;
    };
  }, [getFollowingList]);

  return (
    <div className="App">
      {followingList ? (
        <ReactPlayer
          url={followingList[0].play_url}
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
      ) : null}
    </div>
  );
}

export default App;
