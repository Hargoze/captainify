import { useColorModeValue, Text, Avatar} from '@chakra-ui/react'
import { getAllSongsId, getAllSongsFromAuthor } from '../../lib/api'
import { Header } from '../../components/Header'
import { PageInfo } from '../../components/Head'
import { AuthorBox} from "../../components/AuthorBox"
import { Container } from '../../components/Container'
import React from 'react';

export default function Author ({author, songs}) {
    const textColor = useColorModeValue("black", "white")
    if (!author) {
        return (
            <Text color={textColor}>Loading</Text>
        )
    }
    return (
        <Container>
            <PageInfo title={author.name + " - capitainify"}/>
            <Header />
            <Text fontSize={{base: "45px", lg: "76px" }} color={textColor} textOverflow="ellipsis" noOfLines={1}>{author.name}</Text>

                <Avatar size='2xl' src={`${author.picture.url ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${author.picture.url}`}/>
            <AuthorBox songs={songs}/>
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