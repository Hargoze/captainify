import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Container } from '../components/Container'
import { SongBox} from "../components/SongBox"
import { getAllSongsForHome } from '../lib/api'
import { Flex, Text, useColorModeValue} from '@chakra-ui/react'

export default function Index({songs}) {
  console.log(songs)
  return (
    <Container>
      <DarkModeSwitch />
      <SongBox songs={songs}/>
    </Container>
  )
}

export async function getStaticProps() {
  const songs = (await getAllSongsForHome())
  return {
    props: { songs },
  }
}
