import { useRef, useState, useCallback, useEffect, useMemo } from 'react';

import useAxios from 'hooks/useAxios';
import api from 'api';
import Layout from 'layout/Layout';
import TypeControl from 'components/TypeControl';
import Player from 'components/Player';
import Loading from 'components/Loading';

function App() {
  const effectRan = useRef(false);
  const { sendRequest: sendFollowingListRequest } = useAxios();
  const { sendRequest: sendForYouListRequest } = useAxios();
  const [list, setList] = useState({});
  const type = 'forYou';
  const [index, setIndex] = useState(0);

  const video = useMemo(() => {
    return list?.[type]?.[index];
  }, [list, index]);

  const getFollowingList = useCallback(async () => {
    try {
      const { items } = await sendFollowingListRequest(api.getFollowingList);
      setList((prevList) => ({ ...prevList, following: items }));
    } catch (err) {
      console.error('getFollowingList', err);
    }
  }, [sendFollowingListRequest]);

  const getForYouList = useCallback(async () => {
    try {
      const { items } = await sendForYouListRequest(api.getForYouList);
      setList((prevList) => ({ ...prevList, forYou: items }));
    } catch (err) {
      console.error('getForYouList', err);
    }
  }, [sendForYouListRequest]);

  useEffect(() => {
    if (effectRan.current) {
      getFollowingList();
      getForYouList();
    }
    return () => {
      effectRan.current = true;
    };
  }, [getFollowingList, getForYouList]);

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
