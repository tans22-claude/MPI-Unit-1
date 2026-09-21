import { useEffect, useState, useCallback, useRef } from 'react';

const TOTAL_FRAMES = 303;
const FRAME_PATH = `${import.meta.env.BASE_URL}images/fotostack/`;

export default function FrameSequenceCanvas({ progress = 0 }) {
  const [currentSrc, setCurrentSrc] = useState(`${FRAME_PATH}00001.jpg`);
  const framesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFramePath = useCallback((index) => {
    const num = String(index + 1).padStart(5, '0');
    return `${FRAME_PATH}${num}.jpg`;
  }, []);

  // Preload frames
  useEffect(() => {
    const frames = [];
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded >= TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = getFramePath(i);
      frames.push(img);
    }

    framesRef.current = frames;

    return () => {
      frames.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
    };
  }, [getFramePath]);

  // Update src based on progress
  useEffect(() => {
    if (!isLoaded) return;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(progress * (TOTAL_FRAMES - 1))
    );

    const src = getFramePath(frameIndex);
    setCurrentSrc(src);
  }, [progress, isLoaded, getFramePath]);

  return (
    <img
      src={currentSrc}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      draggable={false}
    />
  );
}
