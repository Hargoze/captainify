import { Container } from '../../components/Container'
import { Box, Stack, Flex, AspectRatio} from '@chakra-ui/react'
import { getAllSongsId, getSongById } from '../../lib/api'
import React from "react"

export default function Songs({song}) {
    console.log(song)
    return (
        <Stack>
            <AspectRatio maxW="560px" ratio={1}>
                <iframe
                    title={song.title}
                    src={song.link}
                    allowFullScreen
                />
            </AspectRatio>
        </Stack>
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