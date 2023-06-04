import { useState, useMemo, useRef } from 'react';

import { typeIndexInitiator } from 'utils';
import useList from 'hooks/useList';
import useIndex from 'hooks/useIndex';
import Layout from 'layout/Layout';
import TypeControl from 'components/TypeControl';
import Player from 'components/Player';
import Loading from 'components/Loading';
import NextCover from 'components/NextCover';

function App() {
  const { list } = useList();
  const NEXT_COVER_CONTAINER_HEIGHT = 50;
  const [type, setType] = useState('forYou');
  const { index, nextIndex } = useIndex({
    type,
    length: list?.[type]?.length,
    height: NEXT_COVER_CONTAINER_HEIGHT,
  });
  const playerRef = useRef();
  const [cacheTime, setCacheTime] = useState(typeIndexInitiator);

  const video = useMemo(() => {
    return list?.[type]?.[index];
  }, [list, type, index]);

  const nextVido = useMemo(() => {
    return list?.[type]?.[nextIndex];
  }, [list, type, nextIndex]);

  const clikedHandler = (item) => {
    setCacheTime((prev) => ({
      ...prev,
      [type]: playerRef.current.getCurrentTime(),
    }));
    setType(item);
  };

  return (
    <div className="App">
      <Layout>
        {video ? (
          <>
            <TypeControl type={type} clikedHandler={clikedHandler} />
            <Player
              url={video.play_url}
              playerRef={playerRef}
              type={type}
              cacheTime={cacheTime}
              setCacheTime={setCacheTime}
            />
          </>
        ) : (
          <Loading />
        )}
        {nextVido ? (
          <NextCover
            height={NEXT_COVER_CONTAINER_HEIGHT}
            cover={nextVido.cover}
            title={nextVido.title}
          />
        ) : null}
      </Layout>
    </div>
  );
}

export default App;
