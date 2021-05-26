import { Stack, Text, IconButton, Flex,useColorModeValue} from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb} from "@chakra-ui/react"
import { getAllSongsId, getSongById } from '../../lib/api'
import { Header } from '../../components/Header'
import { Avatar } from "../../components/Avatar"
import { Container } from '../../components/Container'
import { Thumbnail } from "../../components/Thumbnail"
import React, { useEffect, useState, useRef } from 'react';
import { MdPlayArrow, MdPause } from "react-icons/md";
import { DownloadIcon } from '@chakra-ui/icons'

const PlayPause = ({ isPlaying, onPlayPauseClick }) => (
  <div className="PlayPause">
    {isPlaying ? (
      <IconButton
        isRound
        colorScheme="blue"
        aria-label="Pause"
        size="lg"
        onClick={() => onPlayPauseClick(false)}
        as={MdPause}
      />
    ) : (
      <IconButton
        isRound
        size="lg"
        colorScheme="blue"
        aria-label="Play"
        onClick={() => onPlayPauseClick(true)}
        as={MdPlayArrow}
      />
    )}
  </div>
);

export default function Songs({song}) {
    const [isPlaying, setIsPlaying] = useState(true);

    const audioRef = useRef(new Audio(`${song.file.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.file.url}`));
    const isReady = useRef(true);

    const { duration } = audioRef.current;

    const boxcolor = useColorModeValue("gray.400", "gray.700")
    const textColor = useColorModeValue("black", "white")

    //const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";
    //const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;
    
    useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
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
            <Stack alignItems="center" justifyContent="flex-start" mt="4" pb="2"  bg={boxcolor}>
              <Thumbnail url={song.thumbnail.url} width="630px" height="auto"/>            
              <PlayPause isPlaying={isPlaying} onPlayPauseClick={setIsPlaying}/>
              <Flex w="70%" justify="space-around">
                <Text color={textColor}>0:00</Text>
                <Slider aria-label="music pourcentage"  w="75%"
                max={duration ? duration : `${duration}`}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text color={textColor}>3:00</Text>
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