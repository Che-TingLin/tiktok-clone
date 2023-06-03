import { useRef, useState, useCallback, useEffect, useMemo } from 'react';

import useAxios from 'hooks/useAxios';
import api from 'api';
import Layout from 'layout/Layout';
import Player from 'components/Player';
import Loading from 'components/Loading';

function App() {
  const effectRan = useRef(false);
  const { sendRequest: sendFollowingListRequest } = useAxios();
  const { sendRequest: sendForYouListRequest } = useAxios();
  const [list, setList] = useState({});
  const type = 'forYou';
  const index = 1;

  const video = useMemo(() => {
    return list?.[type]?.[index];
  }, [list]);

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

  return (
    <div className="App">
      <Layout>{video ? <Player url={video.play_url} /> : <Loading />}</Layout>
    </div>
  );
}

export default App;
