import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Container } from '../components/Container'
import { SongBox} from "../components/SongBox"
import { getAllSongsForHome, getAllSongsId, getAllPostsWithSlug } from '../lib/api'

export default function Index({songs}) {
  return (
    <Container>
      <DarkModeSwitch />
      <SongBox songs={songs}/>
    </Container>
  )
}

export async function getStaticProps() {
  const songs = (await getAllSongsForHome())
  const songsID = (await getAllSongsId())

  console.log(songsID)
  return {
    props: { songs },
  }
}
