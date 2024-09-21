'use client';

import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '../ui/button';

export default function YoutubePlayableCard({
  videoId,
  start,
  duration,
}: {
  videoId: string;
  start: number;
  duration: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [inited, setInited] = useState(false);
  const [isWindow, setIsWindow] = useState<boolean>(false);

  useEffect(() => {
    setIsWindow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function init() {
      setPlaying(true);
    }
    if (isWindow) {
      init();
    }
  }, [isWindow]);

  return (
    isWindow && (
      <div className="flex h-full w-full" suppressHydrationWarning>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}&t=${start}s`}
          playsinline={false}
          muted={true}
          onPlay={() => {
            if (inited) return;
            setPlaying(false);
            setInited(true);
          }}
          playing={playing}
          width={'100%'}
          controls={false}
          style={{ zIndex: 0 }}
          playIcon={<Button>1</Button>}
        />
      </div>
    )
  );
}
