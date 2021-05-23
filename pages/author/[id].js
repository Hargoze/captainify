import ReactAudioPlayer from 'react-audio-player'
import { Box, Stack, Flex, AspectRatio, Text, Image, Button, Checkbox} from '@chakra-ui/react'
import { getAllSongsId, getSongById } from '../../lib/api'
import { Header } from '../../components/Header'
import { Container } from '../../components/Container'
import React, { useEffect, useState } from 'react';

//            <Image src={`${author.picture.url ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${author.picture.url}`}/>

export default function Author ({author}) {
    return (
        <Container>
            <Header />
            <Text fontSize={{ base: "100px", md: "60px", lg: "76px" }}>{author.name}</Text>
            <Image width={{base:"50%", lg:"25%"}} borderRadius="full" alt="Bioutifoule Duck" boxSize={{base:"50%", lg:"25%"}} src={`${author.picture.url ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${author.picture.url}`}/>
        </Container>
    )
}

export async function getStaticProps({ params}) {
    const data = await getSongById(params.id)
    const song = data.songs[0]
    const author = song.author
    console.log(author)
    return {
        props: { author },
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