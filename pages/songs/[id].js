import { Box, Stack, Flex, AspectRatio, Text, Image, Button, Checkbox} from '@chakra-ui/react'
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
    console.log(song.link)
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(`${song.file.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.file.url}`));
    const isReady = useRef(false);
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
            <Image src={`${song.thumbnail.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.thumbnail.url}`}/>
            
            <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
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