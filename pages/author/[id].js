import ReactAudioPlayer from 'react-audio-player'
import { Box, Stack, Flex, AspectRatio, Text, Image, Button, Checkbox} from '@chakra-ui/react'
import { getAllSongsId, getAllSongsFromAuthor } from '../../lib/api'
import { Header } from '../../components/Header'
import { SongBox} from "../../components/SongBox"
import { Container } from '../../components/Container'
import React, { useEffect, useState } from 'react';
import { Thumbnail } from "../../components/Thumbnail"

export default function Author ({author, songs}) {
    if (!author) {
        return (
            <Text>Loading</Text>
        )
    }
    return (
        <Container>
            <Header />
            <Text fontSize={{ base: "100px", md: "60px", lg: "76px" }}>{author.name}</Text>
            <Image width={{base:"50%", lg:"25%"}} borderRadius="full" alt="Bioutifoule Duck" boxSize={{base:"50%", lg:"25%"}} src={`${author.picture.url ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${author.picture.url}`}/>
            {songs.map((current, i) => (
                <Box key={i}>
                    <Text >{current.title}</Text>
                    <Thumbnail url={current.thumbnail.url} borderRadius="full"/>
                </Box>
            ))}
        </Container>
    )
}

export async function getStaticProps({ params}) {
    const data = await getAllSongsFromAuthor(params.id)
    const author = data.authors[0]
    const songs = data.authors[0].songs
    return {
        props: { author, songs },
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