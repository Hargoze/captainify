//import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { SongBox} from "../components/SongBox"
import { getAllSongsForHome, getAllSongsId, getAllPostsWithSlug } from '../lib/api'

export default function Index({songs}) {
  return (
    <Container>
      <Header />
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
