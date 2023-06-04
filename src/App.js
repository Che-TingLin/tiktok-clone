import { useState, useMemo, useEffect } from 'react';

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
  const type = 'forYou';
  const { index, nextIndex, setIndex } = useIndex(
    list?.[type]?.length,
    NEXT_COVER_CONTAINER_HEIGHT
  );

  const video = useMemo(() => {
    return list?.[type]?.[index];
  }, [list, index]);

  const nextVido = useMemo(() => {
    return list?.[type]?.[nextIndex];
  }, [list, nextIndex]);

  const clikedHandler = (item) => {
    console.log('item', item);
  };

  return (
    <div className="App">
      <Layout>
        {video ? (
          <>
            <TypeControl clikedHandler={clikedHandler} />
            <Player url={video.play_url} />{' '}
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
