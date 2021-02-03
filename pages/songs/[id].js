import { Container } from '../../components/Container'
import { Text} from '@chakra-ui/react'
import { getAllSongsId, getSongById } from '../../lib/api'

export default function Songs({song}) {
    return (
        <Container>
            <Text>songs</Text>
        </Container>
    )
}

export async function getStaticProps({ params}) {
    const song = await getSongById(params.id)

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