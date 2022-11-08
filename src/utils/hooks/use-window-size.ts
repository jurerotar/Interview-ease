import { useEffect, useState } from 'react';
import breakpoints from '@utils/constants/breakpoints';

type Size = {
  width: number | undefined;
  height: number | undefined;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined
  });

  const [isXsUp, setIsXsUp] = useState<boolean>(false);
  const [isXsDown, setIsXsDown] = useState<boolean>(false);
  const [isSmUp, setIsSmUp] = useState<boolean>(false);
  const [isSmDown, setIsSmDown] = useState<boolean>(false);
  const [isMdUp, setIsMdUp] = useState<boolean>(false);
  const [isMdDown, setIsMdDown] = useState<boolean>(false);
  const [isLgUp, setIsLgUp] = useState<boolean>(false);
  const [isLgDown, setIsLgDown] = useState<boolean>(false);
  const [isXlUp, setIsXlUp] = useState<boolean>(false);
  const [isXlDown, setIsXlDown] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({
        width,
        height
      });
      setIsXsUp(width >= breakpoints.xs);
      setIsXsDown(width < breakpoints.xs);
      setIsSmUp(width >= breakpoints.sm);
      setIsSmDown(width < breakpoints.sm);
      setIsMdUp(width >= breakpoints.md);
      setIsMdDown(width < breakpoints.md);
      setIsLgUp(width >= breakpoints.lg);
      setIsLgDown(width < breakpoints.lg);
      setIsXlUp(width >= breakpoints.xl);
      setIsXlDown(width < breakpoints.xl);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowSize,
    isXsUp,
    isXsDown,
    isSmUp,
    isSmDown,
    isMdUp,
    isMdDown,
    isLgUp,
    isLgDown,
    isXlUp,
    isXlDown
  };
};

export default useWindowSize;
