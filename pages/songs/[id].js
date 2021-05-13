import { Box, Stack, Flex, AspectRatio, Text, Input, Image, Button, Checkbox} from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb} from "@chakra-ui/react"
import { getAllSongsId, getSongById } from '../../lib/api'
import { Header } from '../../components/Header'
import { Container } from '../../components/Container'
import React, { useEffect, useState, useRef } from 'react';

const AudioControls = ({ isPlaying, onPlayPauseClick }) => (
    <div className="audio-controls">
      {isPlaying ? (
        <Button
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          Pause
        </Button>
      ) : (
        <Button
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          Play
        </Button>
      )}
    </div>
);

export default function Songs({song}) {
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    
    const audioRef = useRef(new Audio(`${song.file.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.file.url}`));
    const intervalRef = useRef();
    const isReady = useRef(true);


    const { duration } = audioRef.current;

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;
    const startTimer = () => {
      // Clear any timers already running
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (audioRef.current.ended) {
          console.log("ended")
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }, [1000]);
    };

    const onScrub = (value) => {
      // Clear any timers already running
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
      // If not already playing, start
      if (!isPlaying) {
        setIsPlaying(true);
      }
      startTimer();
    };
    useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
          startTimer();
        } else {
          audioRef.current.pause();
        }
      }, [isPlaying]);
    
      // Handles cleanup and setup when changing tracks
      useEffect(() => {
        audioRef.current.pause();
    
        audioRef.current = new Audio(`${song.file.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.file.url}`);
    
        if (isReady.current) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          // Set the isReady ref as true for the next pass
          isReady.current = true;
        }
      }, []);
    return (
        <Container>
            <Header />
            <Image src={`${song.thumbnail.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.thumbnail.url}`}/>
            
            <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
            <input
              type="range"
              value={trackProgress}
              step="1"
              min="0"
              max={duration ? duration : `${duration}`}
              className="progress"
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
              style={{ background: trackStyling }}
          />
            <Slider 
              w="40%"
              step={10}
              value={currentPercentage}
              min="0"
              max="100"
              display="none"
              onChange={(val) => onScrub(val)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
        </Container>
    )
}

export async function getStaticProps({ params}) {
    const data = await getSongById(params.id)
    const song = data.songs[0]
    return {
        props: { song },
    }
}

export async function getStaticPaths() {
    const allSongs = await getAllSongsId()
    return {
      paths: allSongs.songs.map((post) => ({
        params: { id: post.id },
      })),
      fallback: true,
    }
}