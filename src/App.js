import { useState, useMemo } from 'react';

import useList from 'hooks/useList';
import Layout from 'layout/Layout';
import TypeControl from 'components/TypeControl';
import Player from 'components/Player';
import Loading from 'components/Loading';

function App() {
  const { list } = useList();
  const type = 'forYou';
  const [index, setIndex] = useState(0);

  const video = useMemo(() => {
    return list?.[type]?.[index];
  }, [list, index]);

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
      </Layout>
    </div>
  );
}

export default App;
