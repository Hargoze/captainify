import { Stack, Text, IconButton, Flex,useColorModeValue, Link, Spinner, Button} from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb} from "@chakra-ui/react"
import { getAllSongsId, getSongById } from '../../lib/api'
import { Header } from '../../components/Header'
import { Avatar } from "../../components/Avatar"
import { PageInfo } from '../../components/Head'
import { Container } from '../../components/Container'
import { Thumbnail } from "../../components/Thumbnail"
import React, { useEffect, useState, useRef } from 'react';
import { MdPlayArrow, MdReplay, MdPause } from "react-icons/md";
import { DownloadIcon } from '@chakra-ui/icons'

const PlayPause = ({ isPlaying, onPlayPauseClick}) => (
  <div className="PlayPause">
    {isPlaying ? (
      <IconButton
        isRound
        onClick={() => onPlayPauseClick(false)}
        colorScheme="blue"
        aria-label="Pause"
        size="lg"
        as={MdPause}
      />
    ) : (
      <IconButton
        isRound
        size="lg"
        onClick={() => onPlayPauseClick(true)}
        colorScheme="blue"
        aria-label="Play"
        as={MdPlayArrow}
      />
    )}
  </div>
);

const AudioControls = ({ isPlaying, onPlayPauseClick, trackProgress, duration }) => (
    <div className="audio-controls">
      {trackProgress == duration ? (
        <IconButton
          isRound
          size="lg"
          onClick={() => trackProgress = 0}
          colorScheme="blue"
          variant="outline"
          aria-label="Replay"
          as={MdReplay}
        />
      ) : (
        <PlayPause isPlaying={isPlaying} onPlayPauseClick={onPlayPauseClick}/>
      )}
    </div>
);

export default function Songs({song}) {
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const audioRef = useRef(new Audio(`${song.file.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.file.url}`)); //une sorte de pointeur 
    const intervalRef = useRef();

    const { duration } = audioRef.current;

    const boxcolor = useColorModeValue("gray.400", "gray.700")
    const textColor = useColorModeValue("black", "white")

    const startTimer = () => {
      // Clear any timers already running
      //clearInterval(intervalRef.current);

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
      startTimer();
    };

    const onScrubEnd = () => {
      // If not already playing, start
      if (!isPlaying) {
        setIsPlaying(true);
      }
      startTimer();
    };
    useEffect(() => { //créer du dynamisme : https://dmitripavlutin.com/react-useeffect-explanation/
        if (isPlaying) {
          audioRef.current.play();
          startTimer();
        } else {
          audioRef.current.pause();
        }
      }, [isPlaying]);
      
    return (
        <Container>
            <PageInfo title={song.title + " - capitainify"}/>
            <Header />
            <Stack alignItems="center" justifyContent="flex-start" mt="4" pb="2"  bg={boxcolor}>
              <Thumbnail url={song.thumbnail.url} width="630px" height="auto"/>            
              <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} trackProgress={trackProgress} duration={duration}/>
              {isNaN(duration) ? <Spinner /> :
              <Flex w="70%" justify="space-around">
                <Text color={textColor}>{Math.trunc(trackProgress / 60) + ':' + ((Math.trunc(trackProgress % 60) < 10) ? '0' + Math.trunc(trackProgress % 60) : Math.trunc(trackProgress % 60))}</Text>
                <Slider aria-label="music pourcentage" value={trackProgress} w="75%"
                max={duration ? duration : `${duration}`}
                onChange={(e) => onScrub(e)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text color={textColor}>{Math.trunc(duration / 60) + ':' + ((Math.trunc(duration % 60) < 10) ? '0' + Math.trunc(duration % 60) : Math.trunc(duration % 60))}</Text>
              </Flex>
              }

              <Flex justify="space-between" w="90%" align="center" p="4" bg="gray.100" rounded="lg">
                <Link _hover={{textDecoration:"none", bg:"gray.500"}} href={`/author/${song.author.id}`}>
                  <Flex align="center">
                    <Avatar url={song.author.picture.url}/>
                    <Text fontSize="18px" pl="4">{song.author.name}</Text>
                  </Flex>
                </Link>
                  <IconButton icon={<DownloadIcon/>} colorScheme="blue"/>
                </Flex>
            </Stack>
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