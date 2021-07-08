import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { SongBox} from "../components/SongBox"
import { PageInfo } from "../components/Head"
import { SearchBar } from "../components/SearchBar"
import { getAllSongsForHome, getAllSongs, search} from '../lib/api'
import { Text, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

var offset = 0

export default function Index({songs, nb_pages }) {
  const [result, setResult] = useState()
  //const [offset, setOffset] = useState(0);
  const [input, setInput] = useState('')

  function PreviousPage(setResult, input) {
    if (offset > 0) {
      console.log("before" + offset)
      //setOffset(offset - 1)
      offset = offset - 1
      console.log("after" + offset)
    }
    search(setResult, input, offset)
    return offset
  }

  function NextPage(setResult, input) {
    console.log(songs.length)
    console.log(offset)
    console.log(nb_pages.length / 2)
    if (offset + 1 < nb_pages.length / 2) {
      console.log("before" + offset)
      //setOffset(offset + 1)
      offset = offset + 1
      console.log("after" + offset)
    }
    search(setResult, input, offset)
    return offset
  }
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
          <SearchBar setResult={setResult} input={input} setInput={setInput} offset={offset}/>
          {result ? <SongBox songs={result}/> : <SongBox songs={songs}/>}
          <Button onClick={() => offset = PreviousPage(setResult, input)}>prev page</Button>
          <Text>Page n°{offset + 1}</Text>
          <Button onClick={() => offset = NextPage(setResult, input)}>Next Page</Button>
        </Container>
      )
  }
}

export async function getStaticProps() {
  const error_value = null
  try {
    const songs = await getAllSongsForHome()
    const nb_pages = await getAllSongs()
    return {
      props: { songs, nb_pages },
    }
  } catch (err) {
    console.log(err)
    return {
      props: { error_value },
    }
  }
}