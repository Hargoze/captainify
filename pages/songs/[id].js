import ReactAudioPlayer from 'react-audio-player'
import { Box, Stack, Flex, AspectRatio, Text, Image, Button, Checkbox} from '@chakra-ui/react'
import { getAllSongsId, getSongById } from '../../lib/api'
import { Header } from '../../components/Header'
import { Container } from '../../components/Container'
import React, { useEffect, useState } from 'react';

export default function Songs({song}) {
    return (
        <Container>
            <Header />
            <Image src={`${song.thumbnail.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.thumbnail.url}`}/>
            <ReactAudioPlayer
                src={`${song.file.url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${song.file.url}`}
                controls
            />
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