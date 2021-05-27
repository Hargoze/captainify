import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { SongBox} from "../components/SongBox"
import { PageInfo } from "../components/Head"
import { getAllSongsForHome, } from '../lib/api'
import { Text} from '@chakra-ui/react'

export default function Index({songs}) {
  if (!songs) {
    return (
      <Container>
        <PageInfo title={"capitainify"}/>
        <Text pt="12" pb="6" fontSize="5xl" color="red.500">Erreur !</Text>
        <Text>Verifie que tu as bien lancé captainify-strapi !</Text>
      </Container>
    ) 
  } else {
      return (
        <Container>
          <PageInfo title={"capitainify"}/>
          <Header />
          <SongBox songs={songs}/>
        </Container>
      )
  }
}

export async function getStaticProps() {
  const error_value = null
  try {
    const songs = await getAllSongsForHome()
    return {
      props: { songs },
    }
  } catch (err) {
    console.log(err)
    return {
      props: { error_value },
    }
  }
}