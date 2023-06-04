import { useState, useEffect, useRef, useMemo } from 'react';

import { typeIndexInitiator } from 'utils';

const useIndex = ({ type, length, height }) => {
  const [index, setIndex] = useState(typeIndexInitiator);
  const lastTime = useRef();
  const nextIndex = useMemo(() => {
    if (!length) {
      return 0;
    }
    return (index[type] + 1) % length;
  }, [length, index, type]);

  const isNextTimeOkHandler = () => {
    const now = new Date().getTime();
    if (!lastTime.current) {
      lastTime.current = now;
      return true;
    }
    const isNextTimeOk = now - lastTime.current > 1000;
    if (isNextTimeOk) {
      lastTime.current = now;
    }
    return isNextTimeOk;
  };

  useEffect(() => {
    let handleScroll;
    if (length) {
      handleScroll = () => {
        // const doesGoNext = window.scrollY + window.innerHeight >=
        // document.documentElement.scrollHeight;
        const doesGoNext = window.scrollY >= height;
        if (doesGoNext) {
          if (!isNextTimeOkHandler()) {
            return;
          }
          // 滾動到底部時，播放下一個影片
          setIndex((prev) => ({ ...prev, [type]: (prev[type] + 1) % length }));
        } else if (window.scrollY <= 0) {
          if (!isNextTimeOkHandler()) {
            return;
          }
          // 滾動到頂部時，播放上一個影片
          setIndex((prev) => ({
            ...prev,
            [type]: (prev[type] - 1 + length) % length,
          }));
        }
      };

      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [length, height, type]);

  useEffect(() => {
    let timer;
    if (lastTime.current) {
      window.setTimeout(() => {
        window.scroll(0, -height);
      }, 100);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [index, height]);

  return { index: index[type], nextIndex, setIndex };
};

export default useIndex;
