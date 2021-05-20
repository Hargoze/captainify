import { Stack, Text, IconButton, Flex,useColorModeValue} from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb} from "@chakra-ui/react"
import { getAllSongsId, getSongById } from '../../lib/api'
import { Header } from '../../components/Header'
import { Avatar } from "../../components/Avatar"
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
        as={MdPlayArrow}
      />
    ) : (
      <IconButton
        isRound
        size="lg"
        onClick={() => onPlayPauseClick(true)}
        colorScheme="blue"
        aria-label="Play"
        as={MdPause}
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

    const audioRef = useRef(new Audio(`${song.file.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.file.url}`));
    const intervalRef = useRef();
    const isReady = useRef(true);

    const { duration } = audioRef.current;

    const boxcolor = useColorModeValue("gray.400", "gray.700")
    const textColor = useColorModeValue("black", "white")

    return (
        <Container>
            <Header />
            <Stack alignItems="center" justifyContent="flex-start" mt="4" pb="2"  bg={boxcolor}>
              <Thumbnail url={song.thumbnail.url} width="630px" height="auto"/>            
              <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} trackProgress={trackProgress} duration={duration}/>
              <Flex w="70%" justify="space-around">
                <Text color={textColor}>{Math.trunc(trackProgress / 60) + ':' + ((Math.trunc(trackProgress % 60) < 10) ? '0' + Math.trunc(trackProgress % 60) : Math.trunc(trackProgress % 60))}</Text>
                <Slider aria-label="music pourcentage" value={trackProgress} w="75%"
                max={duration ? duration : `${duration}`}
                
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text color={textColor}>{Math.trunc(duration / 60) + ':' + ((Math.trunc(duration % 60) < 10) ? '0' + Math.trunc(duration % 60) : Math.trunc(duration % 60))}</Text>
              </Flex>

              <Flex justify="space-between" w="90%" align="center" p="4" bg="gray.100" rounded="lg">
                <Flex align="center">
                  <Avatar url={song.author.picture.url}/>
                  <Text fontSize="18px" pl="4">{song.author.name}</Text>
                </Flex>
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
