import { useRef, useState, useCallback, useEffect } from 'react';

import api from 'api';
import useAxios from 'hooks/useAxios';

const useList = () => {
  const effectRan = useRef(false);
  const { sendRequest: sendFollowingListRequest } = useAxios();
  const { sendRequest: sendForYouListRequest } = useAxios();
  const [list, setList] = useState({});

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

  return { list };
};

export default useList;
